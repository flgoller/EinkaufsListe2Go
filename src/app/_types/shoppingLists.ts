import { Product } from "../_types/product";

export class ShoppingList {
    constructor(name: string)
    {
        this.Name = name;
    }
    
    ID: string;
    ChangedOn: string;
    CreatedBy: string;
    CreatedOn: string;
    Name: string;
    Products: Product;
    UserAuthorization: string;
}
