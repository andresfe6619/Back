let instance
class Cotizador {
    static currencies = {
      USD: 1,
      ARS: 290,
      COL: 4512,
      MEX: 20,
    };
  
    getCurrencyPrice(price, currency) {
      switch (currency) {
        case "USD":
          return price * Cotizador.currencies.USD;
        case "ARS":
          return price * Cotizador.currencies.ARS;
        case "COL":
          return price * Cotizador.currencies.COL;
        case "MEX":
         return price * Cotizador.currencies.MEX;
          default:
          break;
      }
    }
  
    static getInstance(){
        if (!instance) {
            instance= new Cotizador();
        
        }
        return instance ;
  


}}
  
  export default Cotizador;