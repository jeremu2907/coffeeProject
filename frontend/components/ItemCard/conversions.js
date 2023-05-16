const factor = {
    "grams" : 28.35,
    "oz" : (1/28.35)
};

const convert = (c, l, m, unit, setC, setL, setM) => 
{
    if(factor[unit] && c && l)
    {
        setC((parseFloat(c) * factor[unit]).toFixed(2).toString());
        setL((parseFloat(l) * factor[unit]).toFixed(2).toString());
    }
    else
    {
        return;
    }
    if(m)
    {
        setM((parseFloat(m) * factor[unit]).toFixed(2).toString());
    }
}

const enterCoffee = (i, c, w, l, m, setL, setM) =>
{
    if(isNaN(c) || isNaN(w) || isNaN(i) || i < 0)
    {
        setL("0.0");
        return;
    }

    const lCoffee = parseFloat(i / c) * w;
    setL(lCoffee.toFixed(2).toString());
            
    if(isNaN(m)) return;

    const milk = parseFloat(lCoffee / l) * m;
    setM(milk);
}

const enterLiquidCoffee = (i, c, w, l, m, setC, setM) =>
{
    if(isNaN(c) || isNaN(w) || isNaN(i) || i < 0)
    {
        setC("0.0");
        return;
    }

    const Coffee = parseFloat(i / w) * c;
    setC(Coffee.toFixed(2).toString());
            
    if(isNaN(m) || isNaN(l)) return;

    const milk = parseFloat(i / l) * m;
    setM(milk);
}

const enterMilk = (i, c, w, l, m, setC, setL) =>
{
    if(isNaN(m) || isNaN(l) || isNaN(i) || i < 0 || isNaN(c))
    {
        setL("0.0");
        setC("0.0");
        return;
    }

    const liquidCoffee = parseFloat(i / m) * l;
    setL(liquidCoffee);

    const Coffee = parseFloat(liquidCoffee / w) * c;
    setC(Coffee.toFixed(2).toString());
}

export { convert };
export { enterCoffee };
export { enterLiquidCoffee };
export { enterMilk };