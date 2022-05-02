export class Product {
    constructor(
        id: string,
        amount: number,
        priority: string,
        name: string,
        createdBy: string,
        createdOn: string,
        notes: string,
        category: string
        )
    {
        this.ID = id;
        this.Amount = amount;
        this.Priority = priority;
        this.Name = name;
        this.CreatedBy = createdBy;
        this.CreatedOn = createdOn;
        this.Notes = notes;
        this.Category = category;
    }

    ID: string;
    Amount: number;
    Priority: string;
    Name: string;
    CreatedBy: string;
    CreatedOn: string;
    Notes: string;
    Category: string;
}
