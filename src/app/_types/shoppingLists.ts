import { Product } from "../_types/product";

export class ShoppingList {
    ID: number;
    ChangedOn: string;
    CreatedBy: number;
    CreatedOn: string;
    Name: string;
    Products: Product;
}
