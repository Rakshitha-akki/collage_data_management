const Department = require('../models/Department');
const Faculty = require('../models/Faculty');
const DepartmentLeadership = require('../models/DepartmentLeadership');
const User = require('../models/User');

exports.assignHOD = async (req, res) => {
  try {
    const { departmentId, facultyId } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) return res.status(404).json({ message: 'Department not found' });

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    // 🔁 If HOD already exists and is different
    if (department.head_of_department && department.head_of_department.toString() !== facultyId) {
      const prevFaculty = await Faculty.findById(department.head_of_department);
      if (prevFaculty) {
        await User.findByIdAndUpdate(prevFaculty.user_id, { role: 'faculty' }); // demote previous HOD
      }

      await DepartmentLeadership.updateOne(
        { faculty_id: department.head_of_department, position: 'HOD', end_date: null },
        { end_date: new Date() }
      );
    }

    // ✅ Set new HOD
    department.head_of_department = facultyId;
    await department.save();

    // ✅ Update faculty role
    await User.findByIdAndUpdate(faculty.user_id, { role: 'hod' });

    // ✅ Create leadership entry if not already present
    const exists = await DepartmentLeadership.findOne({
      faculty_id: facultyId,
      position: 'HOD',
      end_date: null
    });

    if (!exists) {
      const leadership = new DepartmentLeadership({
        faculty_id: facultyId,
        position: 'HOD',
        start_date: new Date(),
        end_date: null
      });
      await leadership.save();
    }

    res.status(200).json({ message: 'HOD assigned successfully', department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllHODs = async (req, res) => {
  try {
    const hods = await Department.find()
      .populate('head_of_department', 'name email designation');

    res.status(200).json({ hods });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
