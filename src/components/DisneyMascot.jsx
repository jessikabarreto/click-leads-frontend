import React, { useState, useEffect } from 'react';
import './DisneyMascot.css';

const DisneyMascot = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const motivationalMessages = [
    "✨ Você está fazendo um trabalho incrível! Continue assim!",
    "🌟 Cada cliente satisfeito é uma estrela no seu céu de sucesso!",
    "🎯 Foque no objetivo e a magia acontecerá!",
    "💫 Transforme cada desafio em uma oportunidade de brilhar!",
    "🚀 Sua dedicação está levando a agência às alturas!",
    "🌈 Depois da tempestade, sempre vem o arco-íris do sucesso!",
    "⭐ Você é a estrela principal da sua própria história de sucesso!",
    "🎪 Bem-vindo ao espetáculo do crescimento profissional!",
    "🏰 Construa seu império de sucesso, tijolo por tijolo!",
    "🎨 Pinte seu futuro com as cores do sucesso!"
  ];

  const helpMessages = [
    "🤔 Precisa de ajuda? Estou aqui para guiá-lo!",
    "💡 Que tal explorar os relatórios para insights valiosos?",
    "📊 Verifique o dashboard para acompanhar seu progresso!",
    "🎯 Lembre-se de qualificar seus leads para melhores resultados!",
    "📈 Acompanhe suas metas para manter o foco no crescimento!",
    "🤝 O sucesso do cliente é o seu sucesso também!",
    "💰 Não esqueça de atualizar os preços dos seus serviços!",
    "📱 Mantenha suas redes sociais sempre atualizadas!",
    "🌐 Um bom SEO é a base de tudo na internet!",
    "💬 Use o WhatsApp integrado para se comunicar melhor!"
  ];

  useEffect(() => {
    // Mostrar mensagem motivacional a cada 30 segundos
    const motivationInterval = setInterval(() => {
      if (!showChat) {
        showRandomMessage(motivationalMessages);
      }
    }, 30000);

    // Mostrar dica de ajuda a cada 45 segundos
    const helpInterval = setInterval(() => {
      if (!showChat) {
        showRandomMessage(helpMessages);
      }
    }, 45000);

    return () => {
      clearInterval(motivationInterval);
      clearInterval(helpInterval);
    };
  }, [showChat]);

  const showRandomMessage = (messages) => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 5000);
  };

  const handleMascotClick = () => {
    setShowChat(!showChat);
    setIsAnimating(false);
    setCurrentMessage('');
  };

  const handleSendMessage = (message) => {
    // Simular resposta da IA
    const responses = [
      "🌟 Ótima pergunta! Vou te ajudar com isso...",
      "✨ Deixe-me pensar na melhor forma de te orientar...",
      "🎯 Entendi! Aqui está o que você pode fazer...",
      "💡 Que tal tentarmos esta abordagem...",
      "🚀 Vamos resolver isso juntos!"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setCurrentMessage(randomResponse);
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 4000);
  };

  if (!isVisible) return null;

  return (
    <div className="disney-mascot-container">
      {/* Mensagem flutuante */}
      {currentMessage && !showChat && (
        <div className={`mascot-message ${isAnimating ? 'animate' : ''}`}>
          <div className="message-bubble">
            {currentMessage}
          </div>
          <div className="message-tail"></div>
        </div>
      )}

      {/* Chat expandido */}
      {showChat && (
        <div className="mascot-chat">
          <div className="chat-header">
            <div className="chat-title">
              <span className="chat-icon">✨</span>
              <span>Assistente Mágico</span>
            </div>
            <button 
              className="chat-close"
              onClick={() => setShowChat(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="chat-content">
            <div className="chat-messages">
              <div className="chat-message bot">
                <div className="message-avatar">🧙‍♂️</div>
                <div className="message-text">
                  Olá! Sou seu assistente mágico! 🌟<br/>
                  Como posso ajudá-lo hoje?
                </div>
              </div>
              
              {currentMessage && (
                <div className="chat-message bot">
                  <div className="message-avatar">🧙‍♂️</div>
                  <div className="message-text">{currentMessage}</div>
                </div>
              )}
            </div>
            
            <div className="quick-actions">
              <button 
                className="quick-action"
                onClick={() => handleSendMessage("Como adicionar um novo cliente?")}
              >
                👥 Adicionar Cliente
              </button>
              <button 
                className="quick-action"
                onClick={() => handleSendMessage("Como gerar relatórios?")}
              >
                📊 Gerar Relatórios
              </button>
              <button 
                className="quick-action"
                onClick={() => handleSendMessage("Como configurar metas?")}
              >
                🎯 Configurar Metas
              </button>
              <button 
                className="quick-action"
                onClick={() => handleSendMessage("Como usar o WhatsApp?")}
              >
                💬 WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mascote */}
      <div 
        className={`mascot ${showChat ? 'chat-open' : ''}`}
        onClick={handleMascotClick}
      >
        <div className="mascot-character">
          🧙‍♂️
        </div>
        <div className="mascot-sparkles">
          <span className="sparkle">✨</span>
          <span className="sparkle">⭐</span>
          <span className="sparkle">💫</span>
        </div>
      </div>

      {/* Botão para minimizar */}
      <button 
        className="mascot-minimize"
        onClick={() => setIsVisible(false)}
        title="Minimizar assistente"
      >
        ➖
      </button>
    </div>
  );
};

export default DisneyMascot;

