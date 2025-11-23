document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SIMULAÇÃO DO BANCO DE DADOS DE PRODUTOS ---
    const PRODUCTS_DATA = {
        'T300-HP-01': { 
            id: 'T300-HP-01', 
            name: 'Turbo Compressor T300 Alta performance', 
            price: 3890.00, 
            img: 'src/img/turbo.png',
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
            img: 'src/img/pastilha.png',
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
            img: 'src/img/amortecedor.png',
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
            img: 'src/img/oleo.png',
            brand: 'Motul', 
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
            img: 'src/img/farol.png',
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
            img: 'src/img/vela.png',
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
                // Adiciona classes do Bootstrap para manter o estilo
                cartLink.className = 'cart-link text-light position-relative text-decoration-none'; 
                cartLink.innerHTML = `<i class="fas fa-shopping-cart fs-5"></i><span class="cart-icon-bubble"></span>`;
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

    // --- 4. RENDERIZAÇÃO DA PÁGINA DO CARRINHO (ATUALIZADA PARA BOOTSTRAP) ---

    const renderCartPage = () => {
        // Agora buscamos pelo ID novo do container
        const cartItemsContainer = document.getElementById('cart-items-container');
        const summaryContainer = document.querySelector('.cart-summary');
        
        if (!cartItemsContainer || !summaryContainer) return;

        cartItemsContainer.innerHTML = ''; // Limpa tudo
        
        const cart = getCart();
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-secondary py-5">Seu carrinho está vazio.</p>';
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;
            
            // HTML NOVO COM CLASSES BOOTSTRAP
            const itemHtml = `
                <div class="cart-item row align-items-center py-3 border-bottom" data-product-id="${item.id}">
                    <div class="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
                        <a href="detalhe-produto.html?id=${item.id}">
                            <img src="${item.img}" alt="${item.name}" class="img-fluid rounded border p-1" style="width: 80px; height: 80px; object-fit: contain;">
                        </a>
                        <div class="ms-3">
                            <h6 class="mb-0 fw-bold"><a href="detalhe-produto.html?id=${item.id}" class="text-decoration-none text-dark">${item.name}</a></h6>
                            <small class="text-secondary">Ref: ${item.id}</small>
                            <div class="d-md-none mt-2">
                                <button class="btn btn-sm text-danger p-0 btn-remove-item"><i class="fas fa-trash-alt"></i> Remover</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-md-2 text-center">
                        <label class="d-md-none small text-secondary d-block">Qtd:</label>
                        <input type="number" value="${item.qty}" min="1" class="form-control form-control-sm text-center mx-auto qty-input" style="max-width: 70px;">
                    </div>

                    <div class="col-6 col-md-2 text-end text-md-center">
                        <label class="d-md-none small text-secondary d-block">Unit:</label>
                        <span class="text-secondary">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    </div>

                    <div class="col-12 col-md-2 text-end">
                        <div class="d-flex justify-content-between d-md-block align-items-center mt-2 mt-md-0">
                            <span class="d-md-none fw-bold">Total:</span>
                            <span class="fw-bold text-dark">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <button class="btn btn-sm text-danger p-0 mt-1 btn-remove-item d-none d-md-inline-block"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
        });

        const shipping = subtotal > 0 ? 55.00 : 0; 
        const total = subtotal + shipping;

        // Atualiza o resumo (usando seletores mais genéricos para evitar erro)
        const subtotalEl = document.getElementById('cart-subtotal');
        const shippingEl = document.getElementById('cart-shipping');
        const totalEl = document.getElementById('cart-total');

        if(subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        if(shippingEl) shippingEl.textContent = `R$ ${shipping.toFixed(2).replace('.', ',')}`;
        if(totalEl) totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        // Event Listeners (Remover e Mudar Qtd)
        cartItemsContainer.querySelectorAll('.btn-remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.closest('.cart-item').dataset.productId;
                const cart = getCart();
                const newCart = cart.filter(item => item.id !== productId);
                saveCart(newCart);
                renderCartPage(); 
            });
        });

        cartItemsContainer.querySelectorAll('.qty-input').forEach(input => {
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
        if(itemListContainer) {
            itemListContainer.innerHTML = ''; 

            cart.forEach(item => {
                subtotal += item.price * item.qty;
                // HTML ATUALIZADO
                const itemHtml = `
                    <div class="order-item d-flex justify-content-between mb-2 small text-secondary">
                        <span>${item.name} (x${item.qty})</span>
                        <span class="fw-bold">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
                    </div>
                `;
                itemListContainer.insertAdjacentHTML('beforeend', itemHtml);
            });
        }
        
        const shipping = subtotal > 0 ? 55.00 : 0;
        const total = subtotal + shipping;
        
        // Atualiza valores do checkout
        const summaryValues = summaryContainer.querySelectorAll('.summary-value');
        if(summaryValues.length >= 2) {
             summaryValues[0].textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`; // Subtotal
             summaryValues[1].textContent = `R$ ${shipping.toFixed(2).replace('.', ',')}`; // Frete
        }
        const finalPrice = summaryContainer.querySelector('.final-price');
        if(finalPrice) finalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    };

    // --- FUNÇÃO PARA DETALHES DO PRODUTO (Mantida) ---
    const renderProductDetailPage = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id'); 
        
        const productInfoContainer = document.querySelector('.product-info');
        if (!productId || !productInfoContainer) return; 

        const product = PRODUCTS_DATA[productId];

        if (!product) {
            alert('Produto não encontrado!');
            navigateTo('produtos.html');
            return;
        }

        document.title = `${product.name} - BIGODE AUTOPEÇAS`;

        const breadcrumbProductName = document.getElementById('breadcrumb-product-name');
        if (breadcrumbProductName) breadcrumbProductName.textContent = product.name;

        productInfoContainer.dataset.productId = product.id;

        const productMainImage = document.getElementById('product-main-image');
        if (productMainImage) {
            productMainImage.src = product.img;
            productMainImage.alt = product.name;
        }

        const productTitle = document.getElementById('product-title');
        if (productTitle) productTitle.textContent = product.name;

        const productSku = document.getElementById('product-sku');
        if (productSku) productSku.textContent = product.id;
        
        const productBrand = document.getElementById('product-brand');
        if (productBrand && product.brand) productBrand.textContent = product.brand;

        const productPrice = document.getElementById('product-price');
        if (productPrice) productPrice.textContent = product.price.toFixed(2).replace('.', ',');

        const productInstallmentPrice = document.getElementById('product-installment-price');
        if (productInstallmentPrice) productInstallmentPrice.textContent = (product.price / 12).toFixed(2).replace('.', ',');

        const productDescription = document.getElementById('product-description');
        if (productDescription) productDescription.textContent = product.description || 'Nenhuma descrição disponível.';

        const productSpecsTable = document.getElementById('product-specs-table');
        if (productSpecsTable && product.specs) {
            productSpecsTable.innerHTML = ''; 
            product.specs.forEach(spec => {
                const row = document.createElement('tr');
                row.innerHTML = `<th scope="row" class="w-25 text-secondary">${spec.label}</th><td>${spec.value}</td>`;
                productSpecsTable.appendChild(row);
            });
        }

        const productCompatibility = document.getElementById('product-compatibility');
        if (productCompatibility) productCompatibility.textContent = product.compatibility || 'Informações não disponíveis.';
    };


    // --- 6. INICIALIZAÇÃO E EVENT LISTENERS GERAIS ---

    const userIcon = document.querySelector('.user-actions a i.fa-user-circle');
    if (userIcon) {
        userIcon.parentElement.addEventListener('click', handleUserIconClick);
    }
    
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

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

    // --- 7. EXECUÇÃO ---
    
    updateCartIcon(); 
    renderCartPage(); 
    renderCheckoutPage(); 

    if (window.location.pathname.includes('detalhe-produto.html')) {
        renderProductDetailPage();
    }
});