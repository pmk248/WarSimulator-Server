interface IMissile {
    name        : string;
    description : string;
    speed       : number;
    intercepts  : string[] | []; 
    price       : number;
}

export default IMissile;
