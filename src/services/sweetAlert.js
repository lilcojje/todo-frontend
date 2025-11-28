// src/services/sweetAlert.js
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

class SweetAlertService {
  // Success notification
  success(message, title = 'Success!') {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      timer: 3000,
      showConfirmButton: false
    });
  }

  // Error notification
  error(message, title = 'Error!') {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: '#dc3545'
    });
  }

  // Warning notification
  warning(message, title = 'Warning!') {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonColor: '#ffc107'
    });
  }

  // Info notification
  info(message, title = 'Info') {
    return Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonColor: '#0dcaf0'
    });
  }

  // Confirmation dialog
  confirm(title = 'Are you sure?', text = "You won't be able to revert this!", confirmButtonText = 'Yes') {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancel'
    });
  }

  // Toast notification
  toast(type, message) {
    return Toast.fire({
      icon: type,
      title: message
    });
  }

  // Loading alert
  loading(title = 'Loading...') {
    return Swal.fire({
      title: title,
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }

  // Close any open alert
  close() {
    Swal.close();
  }
}

export default new SweetAlertService();