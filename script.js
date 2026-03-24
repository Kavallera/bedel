// Configurações
const QUANTIDADE_CARDS = 4; // Altere aqui se quiser mais ou menos cards

// Função principal para gerar todos os cards
function gerarCards() {
    const container = document.getElementById('checklist-container');
    if (!container) return;
    
    container.innerHTML = '';

    for (let i = 0; i < QUANTIDADE_CARDS; i++) {
        const card = criarCard(i);
        container.appendChild(card);
    }
}

// Função para criar um card individual
function criarCard(index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-card-index', index);
    
    card.innerHTML = `
        <div class="card-header">
            <h3>📋 CHECKLIST DE DESMONTAGEM</h3>
            <div class="card-number">Bloco ${index + 1}</div>
        </div>
        <div class="card-body">
            <div class="info-row">
                <div class="info-item">
                    <label>🏫 SALA:</label>
                    <input type="text" class="sala-input" placeholder="Número ou nome da sala" data-card="${index}">
                </div>
                <div class="info-item">
                    <label>📅 DATA:</label>
                    <input type="date" class="data-input" data-card="${index}">
                </div>
                <div class="info-item">
                    <label>⏰ TURNO:</label>
                    <span style="display: flex; gap: 12px;">
                        <label class="radio-label"><input type="radio" name="turno_${index}" value="MANHÃ" class="turno-radio"> MANHÃ</label>
                        <label class="radio-label"><input type="radio" name="turno_${index}" value="TARDE" class="turno-radio"> TARDE</label>
                    </span>
                </div>
            </div>

            <div class="tempos">
                <div class="tempo-item">
                    <strong>🎯 1º TEMPO:</strong>
                    <label class="radio-label"><input type="radio" name="tempo1_${index}" value="D" class="tempo1-radio"> D</label>
                    <label class="radio-label"><input type="radio" name="tempo1_${index}" value="P" class="tempo1-radio"> P</label>
                </div>
                <div class="tempo-item">
                    <strong>🎯 2º TEMPO:</strong>
                    <label class="radio-label"><input type="radio" name="tempo2_${index}" value="D" class="tempo2-radio"> D</label>
                    <label class="radio-label"><input type="radio" name="tempo2_${index}" value="P" class="tempo2-radio"> P</label>
                </div>
            </div>

            <table class="equip-table">
                <thead>
                    <tr>
                        <th>EQUIPAMENTO</th>
                        <th>✓ D</th>
                        <th>⏳ P</th>
                    </tr>
                </thead>
                <tbody>
                    ${gerarLinhaEquipamento('📽️', 'Projetor', index, 'proj')}
                    ${gerarLinhaEquipamento('💻', 'CPU', index, 'cpu')}
                    ${gerarLinhaEquipamento('🔊', 'Amplificador', index, 'amp')}
                    ${gerarLinhaEquipamento('🎤', 'Microfone', index, 'mic')}
                    ${gerarLinhaEquipamento('🔈', 'Áudio', index, 'audio')}
                    ${gerarLinhaEquipamento('🔌', 'Extensão', index, 'ext')}
                </tbody>
            </table>

            <div class="obs">
                <label>📝 OBSERVAÇÕES:</label>
                <textarea rows="2" class="obs-textarea" placeholder="Digite observações importantes sobre esta sala..."></textarea>
            </div>
        </div>
        <div class="card-footer">
            ✓ Marque D (Desmontado) ou P (Pendente) para cada equipamento
        </div>
    `;
    
    return card;
}

// Função auxiliar para gerar linha da tabela de equipamentos
function gerarLinhaEquipamento(emoji, nome, index, id) {
    return `
        <tr>
            <td class="equip-name">
                <span class="emoji">${emoji}</span> ${nome}
            </td>
            <td class="check-status">
                <input type="radio" name="${id}_${index}" value="D" class="equip-radio">
            </td>
            <td class="check-status">
                <input type="radio" name="${id}_${index}" value="P" class="equip-radio">
            </td>
        </tr>
    `;
}

// Função para resetar todos os formulários
function resetAllForms() {
    if (confirm('⚠️ Tem certeza que deseja limpar TODOS os campos preenchidos? Esta ação não pode ser desfeita.')) {
        // Limpar todos os inputs de texto
        document.querySelectorAll('input[type="text"], input[type="date"], textarea').forEach(input => {
            input.value = '';
        });
        
        // Limpar todos os radio buttons
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Feedback visual
        mostrarMensagem('✅ Todos os campos foram limpos!', 'success');
    }
}

// Função para mostrar mensagem temporária
function mostrarMensagem(mensagem, tipo) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = mensagem;
    msgDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${tipo === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 12px 24px;
        border-radius: 40px;
        font-size: 14px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: fadeInOut 2s ease-in-out;
    `;
    
    document.body.appendChild(msgDiv);
    
    setTimeout(() => {
        msgDiv.remove();
    }, 2000);
}

// Adicionar animação CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        15% { opacity: 1; transform: translateX(-50%) translateY(0); }
        85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Salvar dados no localStorage (opcional - mantém os dados entre recarregamentos)
function salvarDadosLocal() {
    const dados = [];
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, idx) => {
        const cardData = {
            sala: card.querySelector('.sala-input')?.value || '',
            data: card.querySelector('.data-input')?.value || '',
            turno: card.querySelector(`input[name="turno_${idx}"]:checked`)?.value || '',
            tempo1: card.querySelector(`input[name="tempo1_${idx}"]:checked`)?.value || '',
            tempo2: card.querySelector(`input[name="tempo2_${idx}"]:checked`)?.value || '',
            observacoes: card.querySelector('.obs-textarea')?.value || '',
            equipamentos: {}
        };
        
        const equipamentos = ['proj', 'cpu', 'amp', 'mic', 'audio', 'ext'];
        equipamentos.forEach(equip => {
            const selected = card.querySelector(`input[name="${equip}_${idx}"]:checked`);
            cardData.equipamentos[equip] = selected ? selected.value : '';
        });
        
        dados.push(cardData);
    });
    
    localStorage.setItem('checklist_desmontagem', JSON.stringify(dados));
}

// Carregar dados do localStorage
function carregarDadosLocal() {
    const dadosSalvos = localStorage.getItem('checklist_desmontagem');
    if (!dadosSalvos) return;
    
    try {
        const dados = JSON.parse(dadosSalvos);
        const cards = document.querySelectorAll('.card');
        
        dados.forEach((cardData, idx) => {
            if (idx >= cards.length) return;
            
            const card = cards[idx];
            
            // Preencher campos de texto
            const salaInput = card.querySelector('.sala-input');
            if (salaInput) salaInput.value = cardData.sala || '';
            
            const dataInput = card.querySelector('.data-input');
            if (dataInput) dataInput.value = cardData.data || '';
            
            const obsTextarea = card.querySelector('.obs-textarea');
            if (obsTextarea) obsTextarea.value = cardData.observacoes || '';
            
            // Preencher radios
            if (cardData.turno) {
                const turnoRadio = card.querySelector(`input[name="turno_${idx}"][value="${cardData.turno}"]`);
                if (turnoRadio) turnoRadio.checked = true;
            }
            
            if (cardData.tempo1) {
                const tempo1Radio = card.querySelector(`input[name="tempo1_${idx}"][value="${cardData.tempo1}"]`);
                if (tempo1Radio) tempo1Radio.checked = true;
            }
            
            if (cardData.tempo2) {
                const tempo2Radio = card.querySelector(`input[name="tempo2_${idx}"][value="${cardData.tempo2}"]`);
                if (tempo2Radio) tempo2Radio.checked = true;
            }
            
            // Preencher equipamentos
            Object.entries(cardData.equipamentos).forEach(([equip, valor]) => {
                if (valor) {
                    const equipRadio = card.querySelector(`input[name="${equip}_${idx}"][value="${valor}"]`);
                    if (equipRadio) equipRadio.checked = true;
                }
            });
        });
    } catch (e) {
        console.error('Erro ao carregar dados salvos:', e);
    }
}

// Auto-salvar ao modificar qualquer campo
function autoSalvar() {
    document.addEventListener('change', function(e) {
        if (e.target.matches('input, textarea, select')) {
            salvarDadosLocal();
        }
    });
    
    document.addEventListener('input', function(e) {
        if (e.target.matches('input[type="text"], input[type="date"], textarea')) {
            salvarDadosLocal();
        }
    });
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    gerarCards();
    autoSalvar();
    carregarDadosLocal();
    
    // Adicionar evento para salvar antes de imprimir
    window.addEventListener('beforeprint', () => {
        salvarDadosLocal();
    });
});

// Exportar funções para uso global (para o botão reset)
window.resetAllForms = resetAllForms;