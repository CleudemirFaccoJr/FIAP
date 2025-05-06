<h1>Bytebank</h1>
<p>Este projeto foi desenvolvido unicamente por Cleudemir Facco Junior. O projeto se trata de um Tech Challenge para o curso de Front-End Engineering - Fase 1 de 2025.</p>
<p>O projeto consiste em um sistema de gerenciamento financeiro. Onde o usuário pode inserir Depósitos e Transferências como transações.<br/> O projeto utiliza as tecnologias <strong>Next.JS</strong>, <strong>Bootstrap</strong> e <strong>Node.JS</strong>. Para banco de dados estou usando o <strong>Firebase</strong> que é o banco de dados que mais tenho usado nos meus projetos pessoais e acredito que facilita a configuração do ambiente local. Além de prever certa escalabilidade, já que os planos do Firebase possuem atrativo financeiro interessante.</p>

<h3>Índice</h3>

<ul>
  <li><a href="#visao">Visão Geral</a></li>
  <li><a href="#tecnologias">Tecnologias Utilizadas</a></li>
  <li><a href="#funcionalidades">Funcionalidades</a></li>
  <li><a href="#prerequisitos">Pré-requisitos</a></li>
  <li><a href="#instalacao">Instalação</a></li>
  <li><a href="#comousar">Como Usar</a></li>
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

<h2 id="tecnologias">Tecnologias Utilizadas</h2>
<p>Para as tecnologias usadas, escolhi aquelas que tenho mais familiaridade e que eu uso no meu dia a dia.</p>
<p>
  <ul>
    <li>Next.js;</li>
    <li>Bootstrap</li>
    <li>CSS</li>
    <li>Node.JS</li>
    <li>Firebase</li>
  </ul>
</p>

<h2 id="funcionalidades">Funcionalidades</h2>
<p>As funcionalidades apresentadas no sistema, são as propostas para o Tech Challenge. Ou seja tem as que foram propostas no PDF que estava disponível no Portal, com o acréscimo daquelas que julguei interessantes para complementar o desafio.</p>
<p>
  <ul>
    <li>Página inicial com saldo e extrato de transações.</li>
    <li>Listagem de transações com opções para visualizar, editar e excluir.</li>
    <li>Modal para adicionar e editar transações.</li>
    <li>Edição dos dados do usuário, com exceção do email.</li>
    <li>Cadastro de Usuário (sem a opção de refedinir senha no modal) - Área Deslogada do site</li>
    <li>Login funcional em modal - Área Deslogada do site</li>
  </ul>
</p>

<h2 id="prerequisitos">Pré Requisitos</h2>
<p>Para os pré requisitos para o uso do sistema temos:</p>
<ul>
  <li>Node.js</li>
  <li>Gerenciador de pacotes (NPM)</li>
  <li>Repositório do projeto clonado.</li>
</ul>

<h2 id="instalacao">Instalação</h2>
<p>Para instalar na sua máquina o sistema siga os passos abaixo:</p>
<p>
  <ol>
    <li>Clone o repositório <br>
    <code>git clone https://github.com/CleudemirFaccoJr/FIAP.git</code>
    </li>
    <li>Instale as dependências:<br/>
    <code>npm install bootstrap</code>
    <code>npm install firebase</code>
    </li>
    <li>Inicie o servidor de desenvolvimento<br/>
    <code>npm run dev</code>
    </li>
  </ol>
</p>

<h2 id="comousar">Como Usar</h2>
<p>Acesse http://localhost:3000 no navegador.</p>
<p>No topo superior do site, você pode navegar entre a parte deslogada do site, e visualizar Serviços [COMPLEMENTAR AQUI]</p>
<p>Além disso, você tem 2 botões no menu: Criar Conta (onde você se cadastra e cria uma conta no Bytebank) e o Acessar Minha Conta - que como o nome diz trará o modal de acesso para a sua conta utilizando email e senha.</p>
