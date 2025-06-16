document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("tipoServico").addEventListener("change", mostrarCampos);
    document.getElementById("formulario").addEventListener("submit", (event) => {
        event.preventDefault();
        calcularOrcamento();
    });
});

function mostrarCampos() {
    let tipoServico = document.getElementById("tipoServico").value;
    document.getElementById("camposTraducao").style.display = tipoServico === "traducao" ? "block" : "none";
    document.getElementById("camposInterpretacao").style.display = tipoServico === "interpretacao" ? "block" : "none";
}

function calcularOrcamento() {
    let tipoServico = document.getElementById("tipoServico").value;
    let resultado = document.getElementById("resultado");
    let total = 0, imposto = 0, direitoImagem = 0;

//CALCULO PARA TRADUCACO
    if (tipoServico === "traducao") {
        let tipoMaterial = document.getElementById("tipoMaterial").value;
        let tempoVideo = parseInt(document.getElementById("tempoVideo").value);
        let legendagem = document.getElementById("legendagem").value === "sim";
        
        let valorMinuto = tipoMaterial === "propaganda" ? 250 : (legendagem ? 96 : 60);
        let valorTotal = tempoVideo * valorMinuto;
        direitoImagem = valorTotal * 0.3;
        total = valorTotal + direitoImagem;
        imposto = total * 0.155;

        //VALORES APRESENTADOS 
        resultado.innerHTML = `
            <p><strong>Valor do minuto:</strong> R$ ${valorMinuto.toFixed(2)}</p>
            <p><strong>Tempo total:</strong> ${tempoVideo} min</p>
            <p><strong>Valor total:</strong> R$ ${valorTotal.toFixed(2)}</p>
            <p><strong>Direito de Imagem:</strong> 30% (R$ ${direitoImagem.toFixed(2)})</p>
            <p><strong>Valor final:</strong> R$ ${total.toFixed(2)}</p>
            <p><strong>Imposto:</strong> R$ ${imposto.toFixed(2)}</p>
        `;
        
//CALCULO PARA INTERPRETACAO
    } else if (tipoServico === "interpretacao") {
        let tipoEvento = document.getElementById("tipoEvento").value;
        let tempoEvento = parseInt(document.getElementById("tempoEvento").value);
        let gravado = document.getElementById("gravado").value === "sim";
        
        let valorHora = tipoEvento === "artistico" ? 192 : 144;
        let qtdInterpretes = Math.ceil(tempoEvento / 360) + (tempoEvento > 60 ? 1 : 0);
        let valorTotalHoras = (valorHora * qtdInterpretes) * (tempoEvento / 60);
        direitoImagem = gravado ? valorTotalHoras * 0.1 : 0;
        total = valorTotalHoras + direitoImagem;
        imposto = total * 0.155;

        //VALORES APRESENTADOS
        resultado.innerHTML = `
            <p><strong>Valor da hora por intérprete:</strong> R$ ${valorHora.toFixed(2)}</p>
            <p><strong>Quantidade de intérpretes:</strong> ${qtdInterpretes}</p>
            <p><strong>Tempo total de horas:</strong> ${(tempoEvento / 60).toFixed(2)} h</p>
            <p><strong>Valor total das Horas:</strong> R$ ${valorTotalHoras.toFixed(2)}</p>
            <p><strong>Direito de Imagem:</strong> ${gravado ? "10%" : "0%"} (R$ ${direitoImagem.toFixed(2)})</p>
            <p><strong>Valor final:</strong> R$ ${total.toFixed(2)}</p>
            <p><strong>Imposto:</strong> R$ ${imposto.toFixed(2)}</p>
        `;

    }
}
