<h1>Bytebank</h1>
<p>Este projeto foi desenvolvido unicamente por Cleudemir Facco Junior. O projeto se trata de um Tech Challenge para o curso de Front-End Engineering - Fase 1 de 2025.</p>
<p>O projeto consiste em um sistema de gerenciamento financeiro. Onde o usuário pode inserir Depósitos e Transferências como transações.<br/> O projeto utiliza as tecnologias <strong>Next.JS</strong>, <strong>Bootstrap</strong> e <strong>Node.JS</strong>. Para banco de dados estou usando o <strong>Firebase</strong> que é o banco de dados que mais tenho usado nos meus projetos pessoais e acredito que facilita a configuração do ambiente local. Além de prever certa escalabilidade, já que os planos do Firebase possuem atrativo financeiro interessante.</p>

<h3>Índice</h3>

<ul>
  <li><a href="#visao">Visão Geral</a></li>
  <li>Tecnologias Utilizadas</li>
  <li>Funcionalidades</li>
  <li>Pré-requisitos</li>
  <li>Instalação</li>
  <li>Como Usar</li>
  <li>Estrutura do Projeto</li>
  <li>Fluxo do Sistema</li>
  <li>Contribuição</li>
  <li>Licença</li>
</ul>

<h2 id="Visao">Visão Geral</h2>
<p>O desafio proposto neste Tech Challenge da Fase 1 é desenvolver um sistema usando Next.Js e seguir um Design System, criando uma interface que permite ao usuário gerenciar transações financeiras.<br/> Um ponto importante a se frisar, é que embora o layout proposto para o Tech Challenge estivesse viável e até mesmo simples de desenvolver, creio que não seguia diretrizes mais modernas quanto ao layout, portanto eu mesmo desenhei um novo layout para o Tech Challenge. De modo que disponibilizo aqui o link para o mesmo, caso queiram comparar com o que foi entregue no resultado final. <br/> Para agilizar meu trabalho, não contemplei TODAS as telas que existiam no Figma da FIAP, mas o que foi solicitado para o Tech Challenge, está presente no sistema. </p>
<p><a href="https://www.figma.com/proto/114lxIxboA0NfK5u96nNGu/Bytebank_TechChallenge?node-id=0-1&t=8iyRHAb3QeHUkHbV-1" target="_blank">Design System Figma (Cleudemir)</a></p>
<p>Além disso, para registro o que ficou entendido é que para o Tech Challenge, as seguintes telas deveriam ser entregues:
<ul>
  <li>Home Page: Esta aqui é a página do Dashboard. Onde o usuário tem um panorama completo das suas transações financeiras;</li>
  <li>Listagem de Transações: No sistema desenvolvido temos 2 listagens. Uma com as transações em formato de lista mesmo, e outra com as transações completas (formato de Cards, clicando no link <b>Ver Extrato Completo<b>) que constam TODAS as transações, mesmo as excluidas.</li>
  <li>Adicionar Transação: Na minha proposta (bem como na da FIAP) é um card. Onde o usuário seleciona o tipo de Transação, e insere o valor.</li>
  <li>Editar Transação: Funcionalidade onde o usuário seleciona na lista de transações do mês, as transações existentes e modifica valor e tipo.</li>  
  <li>**Excluir Transação**: Esta é uma funcionalidade que estava implicita no Figma, mas que não foi descrita para o Tech Challenge, contudo creio que seria um bom exercício e implementei ela no sistema.</li>  
</ul></p>
