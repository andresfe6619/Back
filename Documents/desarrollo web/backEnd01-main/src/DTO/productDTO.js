let instance;
class ProductDTO {
  constructor(data, currencies) {
    this.title = data.title;
    this.stock = data.stock;
    this.price = data.price;
    this.id = data.id;
    for (const [currency, value] of Object.entries(currencies)) {
      this[currency] = value;
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductDTO();
    }
    return instance;
  }
}

export default ProductDTO;
