document.addEventListener('DOMContentLoaded', () => {
    // Carrossel Simples
    const images = document.querySelectorAll('.carousel-img');
    let currentImg = 0;

    if (images.length > 0) {
        setInterval(() => {
            images[currentImg].classList.remove('active');
            currentImg = (currentImg + 1) % images.length;
            images[currentImg].classList.add('active');
        }, 3000);
    }

    // Sistema de Modal ImGui
    const modal = document.getElementById('imgui-modal');
    const overlay = document.getElementById('overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');

    function showModal(title, content) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }

    if (closeBtn) closeBtn.addEventListener('click', hideModal);
    if (overlay) overlay.addEventListener('click', hideModal);

    // Pop-up dos Criadores
    document.querySelectorAll('.creator-link').forEach(link => {
        link.addEventListener('click', () => {
            const name = link.getAttribute('data-name');
            const turma = link.getAttribute('data-turma');
            const numero = link.getAttribute('data-numero');
            
            const content = `
                <div style="color: #00ff00; font-family: monospace;">
                    <p>> NOME: ${name}</p>
                    <p>> TURMA: ${turma}</p>
                    <p>> CHAMADA: ${numero}</p>
                    <p style="margin-top:10px; color: #888;">[Status: Online]</p>
                </div>
            `;
            showModal('User Information', content);
        });
    });

    // Botões de Serviço
    document.querySelectorAll('.svc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const svc = btn.getAttribute('data-svc');
            showModal('Service Details', `<p>Detalhes do serviço: ${svc}</p><p>Status: Disponível para implementação.</p>`);
        });
    });

    // Formulário de Contato
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showModal('System Message', '<p style="color: #00ff00;">Mensagem enviada com sucesso para o servidor.</p>');
            form.reset();
        });
    }
});
