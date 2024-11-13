interface IOrganization extends Document {
    name: string;
    resources: IResource[];
    budget: number;
}

export interface IResource {
    name: string;
    amount: number;
}

export default IOrganization;