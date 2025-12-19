
export interface IClass {
  _id?: string;
  name: string;
  capacity?: number;
  studentIds: string[];   // danh sách học sinh
  grade: number;
  supervisor:  string;
}