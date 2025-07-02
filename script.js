// --- LÓGICA DO FORMULÁRIO ---

// Aguarda o carregamento completo do conteúdo da página para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do formulário no HTML
    const form = document.getElementById('interest-form');
    const studentNameInput = document.getElementById('studentName');
    const studentPhoneInput = document.getElementById('studentPhone');
    const guardianNameInput = document.getElementById('guardianName');
    const guardianPhoneInput = document.getElementById('guardianPhone');
    const shiftInput = document.getElementById('shift');
    const gradeInput = document.getElementById('grade');
    const interestCheck = document.getElementById('interest-check');
    const errorMessage = document.getElementById('error-message');

    // Número de WhatsApp para onde a mensagem será enviada (com código do país)
    const whatsappNumber = '5524981490144';

    // Se o formulário não for encontrado, interrompe o script para evitar erros.
    if (!form) {
        return;
    }

    // Adiciona um "ouvinte" para o evento de envio do formulário
    form.addEventListener('submit', function(event) {
        // Previne o comportamento padrão do formulário (que seria recarregar a página)
        event.preventDefault();

        // Pega os valores dos campos, usando .trim() para remover espaços em branco
        const studentName = studentNameInput.value.trim();
        const studentPhone = studentPhoneInput.value.trim();
        const guardianName = guardianNameInput.value.trim();
        const guardianPhone = guardianPhoneInput.value.trim();
        const shift = shiftInput.value;
        const grade = gradeInput.value;
        const isInterested = interestCheck.checked;

        // --- VALIDAÇÃO ---
        // Verifica se algum campo está vazio ou se o checkbox não foi marcado
        if (!studentName || !studentPhone || !guardianName || !guardianPhone || !shift || !grade || !isInterested) {
            // Mostra a mensagem de erro
            errorMessage.style.display = 'block';
            return; // Para a execução da função aqui
        }

        // Se a validação passou, esconde a mensagem de erro (caso estivesse visível)
        errorMessage.style.display = 'none';

        // Após validação e antes de montar a mensagem do WhatsApp
        const formData = {
            studentName,
            studentPhone,
            guardianName,
            guardianPhone,
            shift,
            grade
        };

        fetch("https://script.google.com/macros/s/AKfycbwpLUt28hI9dBZtl-m6u06krCXrYWqJNpMMKaZdom18_HBrNdaF1fWHeWkkqzlLYsONnw/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                // Aqui você pode mostrar uma mensagem, limpar o formulário, etc
                // Se quiser, pode também disparar o envio do WhatsApp aqui!
                // Por exemplo: window.open(whatsappUrl, '_blank');
            } else {
                alert("Erro ao enviar para a planilha!");
            }
        })
        .catch(error => {
            alert("Erro de conexão com a planilha!");
            console.error(error);
        });


        // --- MONTAGEM DA MENSAGEM ---
        // Cria a mensagem que será enviada para o WhatsApp.
        // O `\n` cria uma nova linha. O `*` em volta do texto cria um efeito de negrito no WhatsApp.
        const message = 
            `Olá! 👋 Sou da Rede FEVRE e quero ganhar um curso... Poderiam me passar mais informações?.

            *DADOS DO ALUNO(A):*
            *Nome:* ${studentName}
            *Telefone:* ${studentPhone}

            *DADOS DO RESPONSÁVEL:*
            *Nome:* ${guardianName}
            *Telefone:* ${guardianPhone}

            *INFORMAÇÕES ESCOLARES:*
            *Turno:* ${shift}
            *Ano/Série:* ${grade}

            Aguardo mais informações!`;

        // Codifica a mensagem para ser usada em uma URL (troca espaços por %20, etc.)
        const encodedMessage = encodeURIComponent(message);

        // Cria a URL final do WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Abre a URL do WhatsApp em uma nova aba do navegador
        window.open(whatsappUrl, '_blank');
    });
});
