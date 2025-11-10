document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SIMULAÇÃO DO BANCO DE DADOS DE PRODUTOS ---
    const PRODUCTS_DATA = {
        'T300-HP-01': { 
            id: 'T300-HP-01', 
            name: 'Turbo Compressor T300 Alta performance', 
            price: 3890.00, 
            img: '../bigodeAutoPeca/src/img/turbo.png',
            brand: 'ForjadoParts',
            description: 'O Turbo Compressor T300 é a escolha definitiva para quem busca performance extrema. Com rotor billet e carcaça de aço inoxidável, garante durabilidade e aumento significativo de potência.',
            specs: [
                { label: 'Material da Carcaça', value: 'Aço Inox Forjado' },
                { label: 'Aplicação', value: 'Motores 1.8L a 2.5L' },
                { label: 'Potência Suportada', value: 'Até 450cv' },
                { label: 'Garantia', value: '12 meses' }
            ],
            compatibility: 'Compatível com a maioria dos veículos de performance com adaptação para turbo. Consulte um especialista.'
        },
        'PA-CE-04': { 
            id: 'PA-CE-04', 
            name: 'Pastilha de Freio Cerâmica XPT', 
            price: 450.90, 
            img: '../bigodeAutoPeca/src/img/pastilha.png',
            brand: 'StopTech',
            description: 'Pastilhas de freio de cerâmica para alta performance, proporcionando frenagens mais eficientes e durabilidade superior, com menos poeira e ruído.',
            specs: [
                { label: 'Composto', value: 'Cerâmica de Alta Performance' },
                { label: 'Aplicação', value: 'Dianteira - Diversos Modelos Esportivos' },
                { label: 'Coeficiente de Fricção', value: '0.45' },
                { label: 'Vida Útil Estimada', value: '30.000 km' }
            ],
            compatibility: 'Verifique a compatibilidade com o modelo e ano do seu veículo na tabela de aplicação.'
        },
        'AM-ES-ADJ': { 
            id: 'AM-ES-ADJ', 
            name: 'Amortecedor Esportivo Ajustável', 
            price: 980.00, 
            img: '../bigodeAutoPeca/src/img/amortecedor.png',
            brand: 'ProRace',
            description: 'Amortecedores esportivos com regulagem de altura e rigidez, ideais para personalizar a suspensão do seu carro para pista ou rua.',
            specs: [
                { label: 'Tipo', value: 'Coilover Ajustável' },
                { label: 'Regulagens', value: 'Altura e Dureza (32 Posições)' },
                { label: 'Material', value: 'Alumínio Forjado' },
                { label: 'Garantia', value: '6 meses' }
            ],
            compatibility: 'Disponível para os principais modelos nacionais e importados. Selecione o modelo do seu veículo.'
        },
        'OL-5W40-PERF': { 
            id: 'OL-5W40-PERF', 
            name: 'Óleo Sintético 5W40 Performance', 
            price: 89.90, 
            img: '../bigodeAutoPeca/src/img/oleo.png',
            brand: 'Motul', // Ou Shell, Castrol, etc.
            description: 'Óleo 100% sintético de alta performance 5W40, projetado para motores modernos. Oferece proteção superior contra o desgaste e otimiza a performance em condições extremas.',
            specs: [
                { label: 'Tipo', value: 'Sintético' },
                { label: 'Viscosidade', value: '5W40' },
                { label: 'Padrões', value: 'API SN, ACEA A3/B4' },
                { label: 'Volume', value: '1 Litro' }
            ],
            compatibility: 'Indicado para motores a gasolina, etanol, flex e GNV de alta performance que requerem essa especificação.'
        },
        'FA-LED-PROJ': { 
            id: 'FA-LED-PROJ', 
            name: 'Farol LED Projetor Tuning XENON', 
            price: 1250.00, 
            img: '../bigodeAutoPeca/src/img/farol.png',
            brand: 'LightForce',
            description: 'Farol LED com projetor e efeito Tuning XENON, proporciona iluminação superior e um visual agressivo para seu veículo.',
            specs: [
                { label: 'Tecnologia', value: 'LED + Projetor' },
                { label: 'Cor da Luz', value: '6000K (Branco Frio)' },
                { label: 'Funcionalidades', value: 'DRL, Setas Sequenciais' },
                { label: 'Instalação', value: 'Plug & Play (em modelos compatíveis)' }
            ],
            compatibility: 'Compatível com modelos específicos. Verifique as especificações do seu veículo.'
        },
        'VE-IRI-COMP': { 
            id: 'VE-IRI-COMP', 
            name: 'Velas de Ignição Iridium Competição', 
            price: 210.00, 
            img: '../bigodeAutoPeca/src/img/vela.png',
            brand: 'NGK',
            description: 'Velas de ignição de Iridium para competição e alta performance. Melhoram a partida, a resposta do acelerador e a queima de combustível.',
            specs: [
                { label: 'Material do Eletrodo', value: 'Iridium' },
                { label: 'Tipo', value: 'Competição' },
                { label: 'Benefícios', value: 'Partida Rápida, Maior Durabilidade' },
                { label: 'Pacote', value: 'Conjunto com 4 Velas' }
            ],
            compatibility: 'Para motores a gasolina/etanol de alta taxa de compressão. Consulte o manual do seu veículo ou um especialista.'
        }
    };

    // --- 2. FUNÇÕES DE LOGIN E AUTENTICAÇÃO ---

    const navigateTo = (pageUrl) => {
        window.location.href = pageUrl;
    };

    const getRegisteredUsers = () => {
        return JSON.parse(localStorage.getItem('users')) || [];
    };

    const saveUsers = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    };

    const handleRegistration = (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('senha');
        
        if (!emailInput.value || !passwordInput.value) {
            alert('Por favor, preencha email e senha.');
            return;
        }
        
        const users = getRegisteredUsers();
        const existingUser = users.find(user => user.email === emailInput.value);
        
        if (existingUser) {
            alert('Este email já está cadastrado. Por favor, faça login.');
            navigateTo('login.html');
        } else {
            users.push({ email: emailInput.value, password: passwordInput.value });
            saveUsers(users);
            alert('Cadastro realizado com sucesso! Você já pode fazer login.');
            navigateTo('login.html');
        }
    };
    
    const handleLogin = (event) => {
        event.preventDefault(); 
        
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('senha');
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!email || !password) {
            alert('Por favor, preencha e-mail e senha.');
            return;
        }

        const users = getRegisteredUsers();
        const user = users.find(u => u.email === email);
        
        if (user && user.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            const userName = email.split('@')[0];
            localStorage.setItem('userName', userName);

            alert('Login realizado com sucesso! Bem-vindo(a), ' + userName + '!');
            navigateTo('index.html');
        } else {
            alert('Email ou senha incorretos.');
        }
    };

    const checkLoginStatus = () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    };

    const getUserName = () => {
        return localStorage.getItem('userName') || 'Cliente';
    };

    const handleUserIconClick = (e) => {
        e.preventDefault();
        if (checkLoginStatus()) {
            if (confirm(`Olá, ${getUserName()}! Deseja sair (logout)?`)) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userName');
                localStorage.removeItem('cart'); 
                alert('Você saiu da sua conta.');
                navigateTo('index.html');
            }
        } else {
            navigateTo('login.html');
        }
    };

    // --- 3. FUNÇÕES GERAIS DO CARRINHO (LocalStorage) ---

    const getCart = () => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    };

    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon(); 
    };

    const updateCartIcon = () => {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        
        let cartIconBubble = document.querySelector('.cart-icon-bubble'); 
        
        if (!cartIconBubble) {
            const userActions = document.querySelector('.user-actions');
            if (userActions) {
                const cartLink = document.createElement('a');
                cartLink.href = 'carrinho.html';
                cartLink.className = 'cart-link';
                cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i><span class="cart-icon-bubble"></span>`;
                userActions.prepend(cartLink);
                cartIconBubble = userActions.querySelector('.cart-icon-bubble');
            }
        }
        
        if (cartIconBubble) {
            cartIconBubble.textContent = totalItems;
            cartIconBubble.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    };

    const requireLoginAndAddToCart = (productId, quantity = 1) => {
        if (!checkLoginStatus()) {
            alert('Você precisa fazer login para comprar.');
            navigateTo('login.html');
            return; 
        }
        addToCart(productId, quantity);
    };

    const addToCart = (productId, quantity) => {
        const cart = getCart();
        const productData = PRODUCTS_DATA[productId];

        if (!productData) {
            alert('Erro: Produto não encontrado!');
            return;
        }

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.qty += quantity;
        } else {
            cart.push({ ...productData, qty: quantity });
        }
        
        saveCart(cart);
        alert(`'${productData.name}' foi adicionado ao carrinho!`);
    };

    // --- 4. RENDERIZAÇÃO DA PÁGINA DO CARRINHO (carrinho.html) ---

    const renderCartPage = () => {
        const cartItemsContainer = document.querySelector('.cart-items-section');
        const summaryContainer = document.querySelector('.cart-summary');
        
        if (!cartItemsContainer || !summaryContainer) return;

        cartItemsContainer.querySelectorAll('.cart-item').forEach(item => item.remove());
        const cartEmptyMessage = cartItemsContainer.querySelector('.cart-empty-message');
        if (cartEmptyMessage) cartEmptyMessage.remove();

        const cart = getCart();
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.querySelector('.cart-table-header').insertAdjacentHTML('afterend', '<p class="cart-empty-message">Seu carrinho está vazio.</p>');
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;
            
            const itemHtml = `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="item-product-info">
                        <a href="detalhe-produto.html?id=${item.id}">
                            <img src="${item.img}" alt="${item.name}">
                        </a>
                        <div>
                            <p class="item-name">${item.name}</p>
                            <p class="item-sku">Ref: ${item.id}</p>
                            <button class="btn-remove-item"><i class="fas fa-trash-alt"></i> Remover</button>
                        </div>
                    </div>
                    <div class="item-quantity">
                        <input type="number" value="${item.qty}" min="1" class="qty-input">
                    </div>
                    <div class="item-price">
                        <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div class="item-total">
                        <span class="total-value">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
            `;
            cartItemsContainer.querySelector('.btn-continue-shopping').insertAdjacentHTML('beforebegin', itemHtml);
        });

        const shipping = subtotal > 0 ? 55.00 : 0; 
        const total = subtotal + shipping;

        summaryContainer.querySelector('.summary-line .summary-value').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        summaryContainer.querySelector('.summary-shipping .summary-value').textContent = `R$ ${shipping.toFixed(2).replace('.', ',')}`;
        summaryContainer.querySelector('.summary-total-final .final-price').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        document.querySelectorAll('.btn-remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.closest('.cart-item').dataset.productId;
                const cart = getCart();
                const newCart = cart.filter(item => item.id !== productId);
                saveCart(newCart);
                renderCartPage(); 
            });
        });

        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = e.target.closest('.cart-item').dataset.productId;
                const newQuantity = parseInt(e.target.value);
                const cart = getCart();
                const item = cart.find(item => item.id === productId);
                
                if (item && newQuantity > 0) {
                    item.qty = newQuantity;
                    saveCart(cart);
                    renderCartPage(); 
                }
            });
        });
    };
    
    // --- 5. RENDERIZAÇÃO DA PÁGINA DE CHECKOUT (checkout.html) ---

    const renderCheckoutPage = () => {
        const summaryContainer = document.querySelector('.checkout-summary-final');
        if (!summaryContainer) return;

        const cart = getCart();
        if (cart.length === 0 && checkLoginStatus()) {
             alert('Seu carrinho está vazio. Redirecionando...');
             navigateTo('produtos.html');
             return;
        } else if (!checkLoginStatus()) {
             alert('Você precisa fazer login para finalizar a compra.');
             navigateTo('login.html');
             return;
        }

        let subtotal = 0;
        const itemListContainer = summaryContainer.querySelector('.order-item-list');
        itemListContainer.innerHTML = ''; 

        cart.forEach(item => {
            subtotal += item.price * item.qty;
            const itemHtml = `
                <div class="order-item">
                    <span class="item-name-summary">${item.name} (x${item.qty})</span>
                    <span class="item-price-summary">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
                </div>
            `;
            itemListContainer.insertAdjacentHTML('beforeend', itemHtml);
        });
        
        const shipping = subtotal > 0 ? 55.00 : 0;
        const total = subtotal + shipping;
        
        summaryContainer.querySelector('.summary-line .summary-value').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        summaryContainer.querySelector('.summary-line.shipping-summary .summary-value').textContent = `R$ ${shipping.toFixed(2).replace('.', ',')}`;
        summaryContainer.querySelector('.summary-total-final .final-price').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    };

    // --- NOVO: FUNÇÃO PARA RENDERIZAR A PÁGINA DE DETALHES DO PRODUTO (detalhe-produto.html) ---
    const renderProductDetailPage = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id'); // Pega o 'id' da URL (ex: ?id=T300-HP-01)
        
        const productInfoContainer = document.querySelector('.product-info');
        if (!productId || !productInfoContainer) {
            // Se não tiver ID na URL ou não estiver na página de detalhes, não faz nada
            return; 
        }

        const product = PRODUCTS_DATA[productId];

        if (!product) {
            // Produto não encontrado, redireciona ou mostra mensagem de erro
            alert('Produto não encontrado!');
            navigateTo('produtos.html');
            return;
        }

        // 1. Atualizar o Título da Página (no <title> do HTML)
        document.title = `${product.name} - BIGODE AUTOPEÇAS`;

        // 2. Atualizar o Breadcrumb
        const breadcrumbProductName = document.getElementById('breadcrumb-product-name');
        if (breadcrumbProductName) {
            breadcrumbProductName.textContent = product.name;
        }

        // 3. Atualizar o data-product-id do contêiner principal
        productInfoContainer.dataset.productId = product.id;

        // 4. Imagem Principal
        const productMainImage = document.getElementById('product-main-image');
        if (productMainImage) {
            productMainImage.src = product.img;
            productMainImage.alt = product.name;
        }

        // 5. Título do Produto (h1)
        const productTitle = document.getElementById('product-title');
        if (productTitle) {
            productTitle.textContent = product.name;
        }

        // 6. SKU e Marca
        const productSku = document.getElementById('product-sku');
        if (productSku) {
            productSku.textContent = product.id;
        }
        const productBrand = document.getElementById('product-brand');
        if (productBrand && product.brand) {
            productBrand.textContent = product.brand;
        }

        // 7. Preço
        const productPrice = document.getElementById('product-price');
        if (productPrice) {
            productPrice.textContent = product.price.toFixed(2).replace('.', ',');
        }

        // 8. Preço da Parcela (Exemplo simples: 12x)
        const productInstallmentPrice = document.getElementById('product-installment-price');
        if (productInstallmentPrice) {
            productInstallmentPrice.textContent = (product.price / 12).toFixed(2).replace('.', ',');
        }

        // 9. Descrição
        const productDescription = document.getElementById('product-description');
        if (productDescription) {
            productDescription.textContent = product.description || 'Nenhuma descrição disponível.';
        }

        // 10. Especificações (tabela)
        const productSpecsTable = document.getElementById('product-specs-table');
        if (productSpecsTable && product.specs) {
            productSpecsTable.innerHTML = ''; // Limpa antes de adicionar
            product.specs.forEach(spec => {
                const row = document.createElement('tr');
                row.innerHTML = `<th>${spec.label}</th><td>${spec.value}</td>`;
                productSpecsTable.appendChild(row);
            });
        }

        // 11. Compatibilidade
        const productCompatibility = document.getElementById('product-compatibility');
        if (productCompatibility) {
            productCompatibility.textContent = product.compatibility || 'Informações de compatibilidade não disponíveis.';
        }
    };


    // --- 6. INICIALIZAÇÃO E EVENT LISTENERS GERAIS ---

    // Ícone de Usuário (Modificado para Logout)
    const userIcon = document.querySelector('.user-actions a i.fa-user-circle');
    if (userIcon) {
        userIcon.parentElement.addEventListener('click', handleUserIconClick);
    }
    
    // Formulário de Login (na página login.html)
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Formulário de Cadastro (na página cadastro.html)
    const registrationForm = document.querySelector('.cadastro-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }

    // Botões "Comprar" ou "Adicionar ao Carrinho"
    document.querySelectorAll('.btn-buy, .btn-add-to-cart, .btn-buy-now').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            let productContainer = e.target.closest('[data-product-id]');
            
            if (!productContainer) {
                // Tenta encontrar o ID no contêiner de detalhes do produto
                productContainer = document.querySelector('.product-info[data-product-id]');
            }

            if (productContainer) {
                const productId = productContainer.dataset.productId;
                let quantity = 1;
                
                const qtyInput = document.getElementById('quantidade');
                if (qtyInput) {
                    quantity = parseInt(qtyInput.value) || 1;
                }
                
                requireLoginAndAddToCart(productId, quantity);
            } else {
                 console.warn('Não foi possível encontrar o ID do produto para adicionar ao carrinho.');
            }
        });
    });

    // Links de Navegação
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.back(); 
        });
    }

    const createAccountLink = document.querySelector('.auth-links a[href="cadastro.html"]');
    if (createAccountLink) {
        createAccountLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('cadastro.html'); 
        });
    }

    const loginLink = document.querySelector('.auth-links a[href="login.html"]');
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('login.html'); 
        });
    }

   

    // Abas de Pagamento
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active-option'));
            option.classList.add('active-option');
            const isCreditCard = option.querySelector('input').value === 'credit-card';
            const cardForm = document.querySelector('.card-details-form');
            if (cardForm) {
                cardForm.style.display = isCreditCard ? 'block' : 'none';
            }
        });
    });
    
    // Botão Finalizar Compra
    const finalizeButton = document.querySelector('.btn-finalize-purchase');
    if(finalizeButton) {
        finalizeButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('cart');
            alert(`Obrigado por comprar na BIGODE AUTOPEÇAS, ${getUserName()}! Seu pedido foi finalizado.`);
            updateCartIcon();
            navigateTo('index.html');
        });
    }

    // --- 7. EXECUÇÃO DAS FUNÇÕES DE RENDERIZAÇÃO ---
    
    updateCartIcon(); 
    renderCartPage(); 
    renderCheckoutPage(); 

    // CHAMA A NOVA FUNÇÃO SE ESTIVER NA PÁGINA DE DETALHES
    if (window.location.pathname.includes('detalhe-produto.html')) {
        renderProductDetailPage();
    }
});