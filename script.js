var druzyny;
var step = 1;
var losowanie = false;
var teams = [];

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

    for(var j=1; j < 17; j++) {
        var aktualnaLista = [];
        teams[j] = 0;
        //console.log("losuje "+j);
        if (j % 2 == 1) // liderzy
        {
            //console.log("to lider");
            for (var i = 0; i < 16; i += 2) {
                if (!druzyny[i].picked) {
                    aktualnaLista.push(i);
                    //console.log("dodaje " + druzyny[i].name);
                }
            }
        }
        else
        {
            //console.log("to wice lider");
            for (var i = 1; i < 16; i += 2) {
                if (!druzyny[i].picked && teams[j-1] != (i - 1))
                {
                    aktualnaLista.push(i);
                    //console.log("dodaje "+druzyny[i].name);
                }
            }
        }
        if(aktualnaLista.length == 0)
            break;
        //console.log("lista zawiera "+aktualnaLista.length);
        var wylosowana = Math.floor(Math.random() * aktualnaLista.length);
        teams[j] = aktualnaLista[wylosowana];
        //console.log("wylosowalem "+wylosowana+", czyli "+druzyny[aktualnaLista[wylosowana]].name);
        druzyny[aktualnaLista[wylosowana]].picked = true;
    }

    if(teams[16] == 0)
    {
        alert("zamiana");
        teams[16] = teams[2];
        for(var i=1; i < 16; i+= 2) {
            if(!druzyny[i].picked){
                teams[2] = i;
                break;
            }
        }
    }
    losujStep();

    return true;
}

function losujStep()
{
    $("#team".concat(step)).addClass("druzynaPicked").text(druzyny[teams[step]].name);

    if(step == 16)
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