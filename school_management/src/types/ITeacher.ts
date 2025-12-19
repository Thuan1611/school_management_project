export interface ITeacher {
    _id?: string | number;
    name: string;
    password?: string; // optional vì khi update có thể không cần
    email: string;
    sex: 'female' | 'male';
    photo: string;
    phone: string;
    subjects: string[];
    classes: string[];
    address: string;
    role: 'teacher';
}
