export function formatPrice(value): any {
  value = value.toString().replace(/[\,]+/g, '');
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return value;
}

export function removeAccents(str): any {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  return str;
}

export function isEmpty(obj): any {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

export class UploadService {
  public imagePath;
  imgURL: any;

  preview(files): any {
    if (files.length === 0) {
      this.imgURL = null;
      return;
    }

    const mimeType = files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      console.error('Only images are supported.');
      return;
    }

    const reader = new FileReader();
    this.imagePath = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
}

export function cleanObj(obj): any {
  const propNames = Object.getOwnPropertyNames(obj);
  for(let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}
