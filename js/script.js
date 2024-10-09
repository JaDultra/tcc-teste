
var atualColor = "red"

function Show(file) {
    var ShowPhoto = document.getElementById('img-grande');
    newPhoto = "assets/" + atualColor + "-" + file + ".jpg"
    ShowPhoto.src = newPhoto
}

function Shoes(color) {
    var tenis = 1
    var mudaCor = color
    while (tenis <= 8) {
        var thumbs = `/assets/thumbs/${mudaCor}-${tenis}.jpg`
        var novaCor = document.getElementById(tenis)
        novaCor.src = thumbs
        tenis++
    }
    atualColor = mudaCor
    Show('1')
}

document.addEventListener('DOMContentLoaded', () => {
    const favoriteBtn = document.getElementById('favorite-btn');
    const heartIcon = document.getElementById('heart-icon');

    // Adiciona comportamento ao botão de favoritos
    if (favoriteBtn && heartIcon) {
        favoriteBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (heartIcon.classList.contains('fa-regular')) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
                heartIcon.style.color = '#ff0000';
            } else {
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
                heartIcon.style.color = '';
            }

            heartIcon.classList.add('animate');
            setTimeout(() => {
                heartIcon.classList.remove('animate');
            }, 600);
        });
    }

    // Adiciona comportamento ao botão do carrinho
    const cartBtn = document.getElementById('cart-btn');
    const cartIcon = document.getElementById('cart-icon');
    const sizeInputs = document.querySelectorAll('input[name="tamanho"]');
    let selectedSize = null;

    if (cartBtn && cartIcon) {
        sizeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                selectedSize = e.target.id;
            });
        });

        cartBtn.addEventListener('mouseover', (e) => {
            cartIcon.style.color = '#00ff11';
            cartIcon.style.transform = 'rotate(-30deg)';
        });

        cartBtn.addEventListener('mouseout', (e) => {
            cartIcon.style.color = '';
            cartIcon.style.transform = 'rotate(0deg)';
        });

        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (!selectedSize) {
                showCustomAlert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
                return;
            }

            const selectedColor = atualColor;
            localStorage.setItem('selectedColor', selectedColor);
            localStorage.setItem('selectedSize', selectedSize);

            window.location.href = 'checkout.html';
        });
    }

    // Fecha o modal quando o botão fechar for clicado
    const closeModalBtn = document.getElementById("close-modal");
    if (closeModalBtn) {
        closeModalBtn.onclick = function() {
            document.getElementById("modal").style.display = "none";
        };
    }

    // Fecha o alerta customizado ao clicar no botão
    const alertCloseBtn = document.getElementById('alert-close-btn');
    if (alertCloseBtn) {
        alertCloseBtn.addEventListener('click', () => {
            document.getElementById('custom-alert').style.display = 'none';
        });
    }

    // Verifica se está na página de checkout e executa apenas se for necessário
    if (window.location.pathname.includes('checkout.html')) {
        handleCheckoutPage();
    }
});

// Função para manipular a página de checkout
function handleCheckoutPage() {
    const selectedColor = localStorage.getItem('selectedColor');
    const selectedSize = localStorage.getItem('selectedSize');

    if (selectedColor && selectedSize) {
        const productImage = document.getElementById('produto-carrinho-img');
        productImage.src = `assets/${selectedColor}-1.jpg`;

        const productSize = document.getElementById('produto-tamanho');
        productSize.textContent = `Tamanho: ${selectedSize}`;
    } else {
        // Apenas exibe um carrinho vazio sem bloquear a navegação
        const checkoutElement = document.querySelector('.checkout');
        if (checkoutElement) {
            checkoutElement.innerHTML = `
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione produtos ao carrinho para visualizar nesta página.</p>
                <a href="index.html" class="btn-voltar">Voltar às Compras</a>
            `;
        }
    }
}
// Função para exibir o alerta customizado
function showCustomAlert(message) {
    const customAlert = document.getElementById('custom-alert');
    if (customAlert) {
        const alertMessage = document.querySelector('.custom-alert-content p');
        alertMessage.textContent = message;
        customAlert.style.display = 'flex';
    }
}

// Função para mostrar confetes
function showConfetti() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Função para finalizar a compra
function finalizarCompra() {
    showConfetti();
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}




document.addEventListener('DOMContentLoaded', () => {
    // Tamanhos
    const sizeInputs = document.querySelectorAll('input[name="tamanho"]');
    sizeInputs.forEach(input => {
        input.addEventListener('click', () => {
            gtag('event', 'select_size', {
                'event_category': 'interaction',
                'event_label': 'tamanhos',
                'value': input.id
            });
        });
    });

    // Botão de adicionar ao carrinho
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            gtag('event', 'add_to_cart', {
                'event_category': 'interaction',
                'event_label': 'add-carrinho'
            });
        });
    }

    // Botão de salvar nos favoritos
    const favoriteBtn = document.getElementById('favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => {
            gtag('event', 'save_favorite', {
                'event_category': 'interaction',
                'event_label': 'salvar-fav'
            });
        });
    }

    // Link do WhatsApp
    const whatsappLink = document.querySelector('.whatsapp-link');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', () => {
            gtag('event', 'whatsapp_share', {
                'event_category': 'interaction',
                'event_label': 'whatsapp-link'
            });
        });
    }

    // Benefícios
    const beneficiosCheckbox = document.getElementById('beneficios');
    if (beneficiosCheckbox) {
        beneficiosCheckbox.addEventListener('change', () => {
            gtag('event', 'toggle_benefits', {
                'event_category': 'interaction',
                'event_label': 'beneficios',
                'value': beneficiosCheckbox.checked ? 'expanded' : 'collapsed'
            });
        });
    }

    // Botão de finalizar compra
    const finalizarBtn = document.querySelector('.btn-finalizar');
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', () => {
            gtag('event', 'finalize_purchase', {
                'event_category': 'interaction',
                'event_label': 'btn-finalizar'
            });
        });
    }
        document.querySelector('.btn-fechar').addEventListener('click', function() {
        window.close(); // Tenta fechar a aba
    });
});

