const enterCoffee = (i, c, w, l, m, setL, setM) =>
{
    if(isNaN(c) || isNaN(w) || isNaN(i) || i < 0)
    {
        setL("0.0");
        // setM("0.0");
        return;
    }

    const lCoffee = parseFloat(i / c) * w;
    setL(lCoffee.toFixed(1).toString());
            
    if(isNaN(m)) return;

    const milk = parseFloat(lCoffee / l) * m;
    setM(milk);
}

const enterLiquidCoffee = (i, c, w, l, m, setC, setM) =>
{
    if(isNaN(c) || isNaN(w) || isNaN(i) || i < 0)
    {
        setC("0.0");
        // setM("0.0");
        return;
    }

    const Coffee = parseFloat(i / w) * c;
    setC(Coffee.toFixed(1).toString());
            
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
    setC(Coffee.toFixed(1).toString());
}

export { enterCoffee };
export { enterLiquidCoffee };
export { enterMilk };