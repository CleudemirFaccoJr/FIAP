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
  <li><a href="#estrutura">Estrutura do Projeto</a></li>
  <li><a href="#fluxo">Fluxo do Sistema</a></li>
  <li><a href="#licenca">Licença</a></li>
</ul>

<h2 id="visao">Visão Geral</h2>
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
<p>No menu temos as opções de Sobre, Serviços, Abrir minha Conta e Já tenho conta.</p>
<p>Caso você já tenha conta, basta clicar no botão Já tenho conta. Preencha seu email e senha, clique Acessar. Após isso você será redirecionado ao dashboard.</p>
<p>Contudo, caso não tenha conta, basta clicar em Abrir minha Conta, preencher seu nome completo, email e definir uma senha. Aceitar as condições de tratamento, e clicar em Criar Conta.</p>
<p>Mais abaixo na <b>Home</b>, temos um banner para criar a conta, além disso temos as vantagens do banco também.</p>
<p>Já nas páginas <b>Sobre</b> e <b>Serviços</b> temos apenas os textos de Lorem Ipsum para preencher, uma vez que no projeto do Figma não temos definição de conteúdo.</p>

<i><b>Dashboard</b></i>
<p>Em Dashboard, assim que você loga, você já tem um panorama da sua organização financeira. temos um bloco com saldo, um com o extrato das transações ativas, e por fim temos a sessão de Nova Transação. Além disso, temos o botão de Ver Extrato Completo, que ao clicar, visualizamos TODAS as transações. Tanto as canceladas, editar e ativas.</p>
<p>Já no bloco de Extrato, temos os botões de Editar e Excluir. Ao clicar, ele abre um modal, onde você seleciona um mês, seleciona as transações que existem. A partir dai você pode alterar o tipo da transação e o valor.<br/> Já o bloco de Excluir, você repete o processo, seleciona o mês e as transações que existem são carregadas. Ai basta clicar em Excluir Transação. Nesse ponto rola um refresh da página, o saldo e o extrato é atualizado.</p>

<i><b>Minha conta</b></i>
<p>Em minha conta, o usuário pode alterar o nome completo que ele usa em sua conta, e preencher o campo Senha para alterar a mesma. Caso ele não queira alterar a senha, basta deixar o campo em branco, que nada será alterado. O email não é possível alterar, pois é o que o usuário usa para acessar.</p>

<i><b>Outros Serviços</b></i>
<p>Em outros serviços, temos o serviço de Meus Cartões. Ali temos apenas de forma ilustrativa o cartãoo físico e o cartão virtual.</p>

<h2 id="estrutura">Estrutura do Projeto</h2>
<p>Para otimizar a organização do projeto, o que pensei foi em separar a área deslogada na raiz da pasta app. Enquanto que para a área logada, coloquei sob o nome de Dashboard. Dessa forma a área logada e deslogada ficam separadas.</p>
<p>Então para fins de esclarecimento a estrutura do projeto é:</p>

  ```
src/
  ├── app/
    ├── classes/
      ├── Extrato.tsx
      ├── Transacao.tsx
      ├── Usuario.tsx
    ├── dashboard/
      ├── page.tsx
      ├── components/
        ├── dashboardnavbar.tsx
        ├── extratoCompletoComponent.tsx
        ├── extratoComponent.tsx
        ├── meuscartoesComponent.tsx
        ├── modaleditarComponent.tsx
        ├── modalexcluirComponent.tsx
        ├── novatransacaoComponent.tsx
        ├── saldoComponent.tsx
        ├── servicosComponent.tsx
    ├── minha-conta/
      ├── page.tsx
    ├── servicos/
      ├── page.tsx
    ├── sobre/
      ├── page.tsx
    ├── components/
      ├── abrirModal.tsx
      ├── footer.tsx
      ├── modalLogin.tsx
      ├── navbar.tsx
    ├── lib/
      ├── firebase.ts
    ├── styles/
      ├── dashboard.css
      ├── dashboardnavbar.css
      ├── footer.css
      ├── minhaconta.css
      ├── notfound.css
      ├── style.css
  ```


<h2 id="fluxo">Fluxo do Sistema</h2>
<p>Para navegar no sistema, inicie pela parte deslogada.</p>

![image](https://github.com/user-attachments/assets/e4dafac6-63e2-42d3-8781-dc37ff8a3704)
> Imagem da Home "deslogada" do Bytebank

<p>Caso o usuário não tenha conta, basta clicar em qualquer botão "Abrir Minha Conta" que o modal para o cadastro na plataforma abrirá. <br/> Caso o usuário tenha cadastro na conta, basta clicar em "Já tenho conta".</p>

![image](https://github.com/user-attachments/assets/9afc7801-31e7-47a7-9982-834f4382fc00)
> Imagem demonstrando modal de Criar Conta.

![image](https://github.com/user-attachments/assets/898a298d-8a74-466b-a36e-9acae21e2589)
> Imagem demonstrando modal de Entrar na conta do Usuário.

<p>Após o cadastro o usuário pode clicar no botão para entrar na conta, e acessar o Dashboard.</p>

![image](https://github.com/user-attachments/assets/8926c2be-4932-4227-b1f0-0485ea4180e1)
> Imagem demonstrando Dashboard do sistema. O usuário pode acessar os módulos simplesmente clicando nas áreas desejadas.

<h2 id="licenca">Licença</h2>
<p>MIT License</p>
