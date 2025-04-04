type AppDispatch = typeof store.dispatch;

type RootState = ReturnType<typeof store.getState>;

interface DepartmentTypes {
  department_id: number;
  department_name: string;
  is_active: number;
}
interface DepartmentFormProps {
  onSubmit: (data: Omit<DepartmentTypes, 'department_id'>, id?: number) => void;
  onCancel: () => void;
  defaultValues?: DepartmentTypes;
  isEditing: boolean;
}
