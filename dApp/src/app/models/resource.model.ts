export class Resource {
    id?:number;
    name: string;
    content: string;

    constructor(name: string, content: string){
        this.name = name; 
        this.content = content;
    }

    setId(id: number){
        this.id = id;
    }

    getId(){
        return this.id
    }
}