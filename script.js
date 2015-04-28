var druzyny;
var step = 1;
var losowanie = false;

function blad(tresc)
{
    $("div#errorMessage").show().text(tresc);
    return true;
}

function resetujBlad()
{
    $("div#errorMessage").hide();
    return true;
}

function initial()
{
    $("button#losuj").click(losuj);
    $("button#reset").click(reset);
}

function losuj()
{
    if(losowanie)
    {
        return losujStep();
    }

    druzyny = $("textarea#inputs").val().split("\n");
    if(druzyny.length < 16) {
        blad("Zbyt mała liczba drużyn, należy wpisać 16.");
        return true;
    }

    resetujBlad();

    for(var i=0; i < 16; i++)
    {
        druzyny[i] = {
            'name': druzyny[i],
            'picked': false
        };
    }

    step = 1;
    losowanie = true;
    $("#chooseSingle").prop("disabled", true);
    if(!$("#chooseSingle").is(":checked"))
        $("#losuj").prop("disabled", true);
    losujStep();

    return true;
}

function losujStep()
{
    var aktualnaLista = [];
    //alert("a");
    if(step%2 == 1) // liderzy
    {
        //alert("b");
        for(var i=0; i < 16; i+=2)
        {
            if(!druzyny[i].picked)
                aktualnaLista.push(i);
        }
    }
    else
    {
        //alert("c");
        for(var i=1; i < 16; i+=2)
        {
            if(!druzyny[i].picked && $("#team".concat(step-1)).text() != druzyny[i-1].name)
                aktualnaLista.push(i);
        }
    }
    //alert("d");
    var wylosowana = Math.floor(Math.random()*aktualnaLista.length);
    //alert(wylosowana);
    $("#team".concat(step)).addClass("druzynaPicked").text(druzyny[aktualnaLista[wylosowana]].name);
    druzyny[aktualnaLista[wylosowana]].picked = true;

    if(step == 17)
        $("#losuj").prop("disabled", true);

    step++;
    if(step <= 16 && !$("#chooseSingle").is(":checked"))
        return losujStep();
}

function reset()
{
    //$("textarea#inputs").val("");
    $("span.druzynaPicked").text("?");
    $("span.druzynaPicked").removeClass("druzynaPicked");
    $("#chooseSingle").prop("disabled", false);
    $("#losuj").prop("disabled", false);
    losowanie = false;
    step = 1;
    resetujBlad();
}

window.onload = initial;