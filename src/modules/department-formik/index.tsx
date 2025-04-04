import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { fetchDepartment, addDepartment, updateDepartment, deleteDepartment } from '@/redux/slice/departmentSlice';

const departmentSchema = Yup.object().shape({
  department_name: Yup.string().min(3, 'Department name must be at least 3 characters').required('Required'),
  is_active: Yup.number().min(0).max(1),
});

// Department Form Component
const DepartmentForm: React.FC<DepartmentFormProps> = ({ onSubmit, onCancel, defaultValues, isEditing }) => {
  return (
    <Formik
      initialValues={{
        department_name: defaultValues?.department_name || '',
        is_active: defaultValues?.is_active,
      }}
      validationSchema={departmentSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit({ ...values, is_active: values.is_active ?? 0 }, isEditing ? defaultValues?.department_id : undefined);
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form style={styles.form}>
          <h3>{isEditing ? 'Edit Department' : 'Add Department'}</h3>
          <div style={styles.inputGroup}>
            <label>Department Name:</label>
            <Field name="department_name" type="text" style={styles.input} />
            <ErrorMessage name="department_name" component="div" />
          </div>
          <div style={styles.inputGroup}>
            <label>Is Active?</label>
            <select
              name="is_active"
              style={styles.input}
              value={values.is_active}
              onChange={(e) => setFieldValue('is_active', e.target.value)}
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
        </Form>
      )}
    </Formik>
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
const DepartmentFormik: React.FC = () => {
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

export default DepartmentFormik;
