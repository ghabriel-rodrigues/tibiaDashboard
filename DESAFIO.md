# Desafio

Com mais e mais novas tecnologias sendo criadas, atualizadas e complementadas a cada dia, a _CipSoft_ acaba de te pedir (entenda "contratar" na atual ficção) um MVP (Minimum Viable Product) de como seria o seu novo site de um do seus mais famosos (e odiados?) produtos, [_Tibia_](tibia.com).

Logo ao acessar o site (tendo vc feito isso ou não), independente da aparência, há diversas telas/funcionalidades que poderiam ser aprimoradas/reestruturadas e, com base nisso, eles pedem que vc construa o MVP visando não apenas a funcionalidade e simplicidade no uso do site, mas também que o sistema seja desenvolvido de modo estruturado, escalável e de fácil manutenção (vulgo utilizando boas práticas), dado que nas iterações futuras vc deverá trabalhar em conjunto com um time de dev da _CipSoft_.

## Back

Utilizando o [projeto em serverless](https://github.com/contartec/pseudo-serverless) (e se baseando no [código existente](https://github.com/contartec/pseudo-serverless) caso queira ou não), vc deverá utilizar a API do serviço [_TibiaData API_](https://tibiadata.com/) para buscar as informações necessárias de acordo com as funcionalidades.

Além disso,

Requerimentos:

- [Serverless framework](https://serverless.com) utilizando [`serverless-offline`](https://www.npmjs.com/package/serverless-offline) e [`serverless-offline-scheduler`](https://www.npmjs.com/package/serverless-offline-scheduler) (já configurados no projeto base) para integração com o front.

Será levado em conta:

- Divisão de responsabilidade entre as classes/funções;
- Estruturação/Organização do código;
- Testes devem cobrir funcionalidades críticas, complexas e com entrada de dados variáveis.

Qualquer lib/API/coisa que seja pode ser utilizada no projeto, incluindo criar o projeto do zero. 

## Front

Conforme o seu planejamento e avaliação, as telas devem ser construídas de acordo com os módulos (próxima seção) e suas respectivas informações que poderão ser consultadas.

### JS

Requerimentos:

- Angular ou AngularJS

Será levado em conta:

- Divisão de responsabilidade entre as classes/funções;
- Estruturação/Organização dos módulos (vulgo arquivos/pastas);
- Estruturação/Organização do código;
- Gulp/Grunt/tantofaz com a tasks para o `build`, `test` e `start` da app;
- Ao menos **1** (arquivo de) teste unitário para **um** `.controller` e `.service` (ou `.factory`) críticos;
- Ao menos **1** teste `e2e`.

Seguindo o framework, seja feliz usando aquilo que lhe aquece a alma.

### Interface

Do ponto de vista funcional, a interface deve ser simples, prática e informativa, logo, os elementos/estilos utilizados na composição do layout das telas devem ser projetado/focados de acordo. No caso, _"elegância"_/"beleza"/purpurinagens em geral não serão levados em conta, mas sim a usabilidade e praticidade ao atingir o objetivo com qual cada tela foi planejada, no caso, será levado em conta..

- Usabilidade;
- Navegabilidade;
- Fluxo de uso;
- Acesso à informação (simplicidade, inteligível, facilmente encontrada, etc).

Qualquer template/_inspiração_/criatividade pode ser usada na interface.

## Módulos

### Mundos ([Worlds](https://www.tibia.com/community/?subtopic=worlds))

https://tibiadata.com/doc-api-v2/worlds/

#### Funcionalidades esperadas:

- Listagem (ordem alfabética por padrão)
- Busca
- Visualização dos detalhes
- ~~Rotina agendada (vulgo [schedule](https://serverless.com/framework/docs/providers/aws/events/schedule/)) que sincroniza os `Mundos` vindos da API no banco `a cada hora`~~ (_Já implementada_)

#### Atributos (e comportamentos de exibição)

- Nome
- Data de criação
- Local do servidor
- Tipo do PvP
- Total de players online
- Total máximo registrado de players online (e data)
- Sistema `BattleEye`
  * Possui sistema `BattleEye`?
- Transferência (`transfer_type`)
  * Permite transferências?

### Top players ([Highscores](https://www.tibia.com/community/?subtopic=highscores))

https://tibiadata.com/doc-api-v2/highscores/

#### Funcionalidades esperadas (`backend` only)

- Rotina agendada (vulgo [schedule](https://serverless.com/framework/docs/providers/aws/events/schedule/)) que salva os _20 primeiros jogadores_ do _ranking do tipo `experience`_ de todos os `Mundos` (persistidos no banco) a cada `20min`

#### Atributos

- Dados do personagem
- Posição no ranking
- Tipo do ranking
- Level
