class ItemDetails {
    constructor(id, name, price, itemQty) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.itemQty = itemQty;
        this.totalRowPrice = price * itemQty;
    }
}
