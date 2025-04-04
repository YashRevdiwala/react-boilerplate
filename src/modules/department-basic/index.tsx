import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addDepartment, deleteDepartment, fetchDepartment, updateDepartment } from '@/redux/slice/departmentSlice';

// Department Form Component
const DepartmentForm: React.FC<DepartmentFormProps> = ({ onSubmit, onCancel, defaultValues, isEditing }) => {
  const [formValues, setFormValues] = useState<Omit<DepartmentTypes, 'department_id'>>({
    department_name: '',
    is_active: 1,
  });

  useEffect(() => {
    if (defaultValues) {
      setFormValues({ department_name: defaultValues.department_name, is_active: Number(defaultValues.is_active) });
    }
  }, [defaultValues]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      department_name: formData.get('department_name') as string,
      is_active: formData.get('is_active') as unknown as number,
    };
    onSubmit(data, isEditing ? defaultValues?.department_id : undefined);
    setFormValues({ department_name: '', is_active: 1 }); // Reset form after submission
  };
  return (
    <form onSubmit={submitHandler} style={styles.form}>
      <h3>{isEditing ? 'Edit Department' : 'Add Department'}</h3>
      <div style={styles.inputGroup}>
        <label>Department Name:</label>
        <input
          name="department_name"
          required
          type="text"
          style={styles.input}
          defaultValue={formValues.department_name}
          onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Is Active?</label>
        <select
          style={styles.input}
          value={formValues.is_active}
          name="is_active"
          onChange={(e) => setFormValues((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }))}
        >
          <option value={1}>✅ Active</option>
          <option value={0}>❌ Inactive</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={styles.button}>
          {isEditing ? 'Update' : 'Add'} Department
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

// Department Table Component
const DepartmentTable: React.FC<{
  data: DepartmentTypes[];
  onEdit: (department: DepartmentTypes) => void;
  onDelete: (id: number) => void;
}> = ({ data, onEdit, onDelete }) => {
  return (
    <table border={1} cellPadding={8} cellSpacing={0} style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Department ID</th>
          <th>Department Name</th>
          <th>Is Active?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.department_id}>
              <td>{item.department_id}</td>
              <td>{item.department_name}</td>
              <td>{item.is_active ? '✅ Active' : '❌ Inactive'}</td>
              <td>
                <button onClick={() => onEdit(item)} style={{ marginRight: '8px' }}>
                  Edit
                </button>
                <button onClick={() => onDelete(item.department_id)} style={{ marginRight: '8px', color: 'red' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center', padding: '10px' }}>
              No departments found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

// Main Department Component
const DepartmentBasic: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, error, loading } = useSelector((state: RootState) => state.department);

  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<DepartmentTypes | null>(null);

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  const handleAddOrUpdateDepartment = async (department: Omit<DepartmentTypes, 'department_id'>, id?: number) => {
    if (id) {
      await dispatch(updateDepartment({ ...department, department_id: id }));
    } else {
      await dispatch(addDepartment(department));
    }

    setShowForm(false);
    setEditingDepartment(null);

    await dispatch(fetchDepartment());
  };

  const handleEdit = (department: DepartmentTypes) => {
    setEditingDepartment(department);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      await dispatch(deleteDepartment(id));
      await dispatch(fetchDepartment());
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingDepartment(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Department Management</h2>

      {!showForm ? (
        <button onClick={() => setShowForm(true)} style={styles.button}>
          Add Department
        </button>
      ) : (
        <DepartmentForm
          onSubmit={handleAddOrUpdateDepartment}
          onCancel={handleCancel}
          defaultValues={editingDepartment || undefined}
          isEditing={!!editingDepartment}
        />
      )}

      <DepartmentTable data={data ?? []} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

// Styles
const styles = {
  form: { maxWidth: '400px', marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' },
  inputGroup: { display: 'flex', flexDirection: 'column' as const, marginBottom: '10px' },
  input: { padding: '8px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' },
  button: { padding: '10px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', width: '100%' },
  cancelButton: {
    padding: '10px',
    background: 'gray',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
};

export default DepartmentBasic;
