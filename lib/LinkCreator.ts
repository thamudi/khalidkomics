import qs from 'qs';

export class LinkCreator {
  static query(object: any) {
    return qs.stringify(object);
  }
  static toQuery(object: any, path = '/') {
    const query = this.query(object);
    return path + '?' + query;
  }
}
