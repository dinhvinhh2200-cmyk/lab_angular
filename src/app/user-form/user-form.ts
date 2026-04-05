import { Component, computed, signal } from '@angular/core';

export interface User {
  userName: string;
  tenNguoiDung: string;
  email: string;
  tuoi: number;
  gioiTinh: string;
  photo: string;
}

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  user = signal<User>({
    userName: '',
    tenNguoiDung: '',
    email: '',
    tuoi: 1,
    gioiTinh: 'Nam',
    photo: 'https://placehold.co/300x200',
  });

  touched = signal<Record<keyof User, boolean>>({
    userName: false,
    tenNguoiDung: false,
    email: false,
    tuoi: false,
    gioiTinh: false,
    photo: false,
  });

  setTouched(field: keyof User) {
    this.touched.update((t) => ({ ...t, [field]: true }));
  }

  updateField(field: keyof User, value: any) {
    let finalValue = value;
    if (field === 'tuoi') {
      finalValue = Number(value); // Ép kiểu về số
    }
    this.user.update((p) => ({ ...p, [field]: finalValue }));
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // ✅ Check dung lượng
    if (file.size > 8 * 1024 * 1024) {
      alert('File không được lớn hơn 8MB');
      return;
    }

    const img = new Image();
    img.onload = () => {
      // ✅ Check độ phân giải
      if (img.width < 400 || img.height < 400) {
        alert('Ảnh phải lớn hơn 400x400');
        return;
      }

      // ✅ Nếu hợp lệ thì lưu
      const reader = new FileReader();
      reader.onload = () => {
        this.updateField('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    };

    img.src = URL.createObjectURL(file);
  }

  userNameError = computed(() => {
    const userName = this.user().userName.trim();
    if (userName.length == 0) return 'Tên không được bỏ trống';

    // Regex: bắt đầu bằng chữ + chỉ chứa chữ và số
    const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    if (!regex.test(userName)) {
      return 'Username phải bắt đầu bằng chữ và chỉ chứa chữ hoặc số (không khoảng trắng, không ký tự đặc biệt).';
    }

    return null;
  });

  fullNameError = computed(() => {
    const fullName = this.user().tenNguoiDung.trim();

    // 1. Không được bỏ trống
    if (fullName.length === 0) {
      return 'Họ và tên không được để trống.';
    }

    // 2. Ít nhất 3 ký tự
    if (fullName.length < 3) {
      return 'Họ và tên phải có ít nhất 3 ký tự.';
    }

    // 3. Phải có ít nhất 2 từ
    const words = fullName.split(' ').filter((w) => w.length > 0);
    if (words.length < 2) {
      return 'Họ và tên phải có ít nhất 2 từ.';
    }

    // 4. Không chứa số hoặc ký tự đặc biệt (chỉ chữ + khoảng trắng)
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!regex.test(fullName)) {
      return 'Họ và tên không được chứa số hoặc ký tự đặc biệt.';
    }

    return null;
  });

  emailErrors = computed(() => {
    const email = this.user().email.trim();

    // 1. Không được bỏ trống
    if (email.length === 0) {
      return 'Email không được để trống.';
    }

    // 2. Kiểm tra format email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      return 'Email không đúng định dạng.';
    }

    return null;
  });

  ageError = computed(() => {
    const age = this.user().tuoi;

    if (age < 18) return 'Tuổi không được nhỏ hơn 18';
    if (age > 60) return 'Tuổi không được lớn hơn 60';
    return null;
  });

  photoError = computed(() => {
    const photo = this.user().photo;
    if (!photo) return 'Bạn phải chọn ảnh đại diện';
    return null;
  });

  formInvalid = computed(() => {
    return (
      this.userNameError() !== null ||
      this.fullNameError() !== null ||
      this.emailErrors() !== null ||
      this.ageError() !== null ||
      this.photoError() !== null
    );
  });
}
