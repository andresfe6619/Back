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
  }
  
  export default ProductDTO;