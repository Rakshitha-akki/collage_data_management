const Department = require('../models/Department');
const Faculty = require('../models/Faculty');
const User = require('../models/User');
const DepartmentLeadership = require('../models/DepartmentLeadership');

// Add a new department
exports.addDepartment = async (req, res) => {
  try {
    const { name, contact_email } = req.body;

    const existing = await Department.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Department already exists' });

    const department = new Department({ name, contact_email });
    await department.save();

    res.status(201).json({ message: 'Department added', department });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign HOD to department and update user role
exports.assignHOD = async (req, res) => {
  try {
    const { departmentId, facultyId } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) return res.status(404).json({ message: 'Department not found' });

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    // Update the department's head_of_department
    department.head_of_department = facultyId;
    await department.save();

    // Update the user's role to 'hod'
    await User.findByIdAndUpdate(faculty.user_id, { role: 'hod' });

    // Add or update DepartmentLeadership entry
    const existingLeadership = await DepartmentLeadership.findOne({
      faculty_id: facultyId,
      position: 'HOD'
    });

    if (!existingLeadership) {
      const leadership = new DepartmentLeadership({
        faculty_id: facultyId,
        position: 'HOD',
        start_date: new Date(),
        end_date: null
      });
      await leadership.save();
    }

    res.status(200).json({ message: 'HOD assigned successfully', department });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
