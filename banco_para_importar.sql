-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 26/08/2025 às 14:45
-- Versão do servidor: 5.7.23-23
-- Versão do PHP: 8.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `megagr80_esquilo`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `active_sessions`
--

CREATE TABLE `active_sessions` (
  `id` int(11) NOT NULL,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `current_page` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `last_activity` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `admin_permissions`
--

CREATE TABLE `admin_permissions` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `permission` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `admin_permissions`
--

INSERT INTO `admin_permissions` (`id`, `admin_id`, `permission`) VALUES
(134, 13, 'gerenciar_usuarios'),
(135, 13, 'ver_relatorios'),
(136, 13, 'editar_configuracoes'),
(137, 13, 'gerenciar_admins'),
(138, 13, 'ver_financeiro'),
(139, 13, 'acessar_dashboard'),
(140, 15, 'gerenciar_usuarios'),
(141, 15, 'ver_relatorios'),
(142, 15, 'editar_configuracoes'),
(143, 15, 'ver_financeiro'),
(144, 15, 'acessar_dashboard');

-- --------------------------------------------------------

--
-- Estrutura para tabela `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `nome` text NOT NULL,
  `email` text NOT NULL,
  `contato` text,
  `senha` text NOT NULL,
  `nivel` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `token_recover` text,
  `avatar` text,
  `2fa` text,
  `senha_saque` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `admin_users`
--

INSERT INTO `admin_users` (`id`, `nome`, `email`, `contato`, `senha`, `nivel`, `status`, `token_recover`, `avatar`, `2fa`, `senha_saque`) VALUES
(13, 'Ryan', 'adm@adm.com.br', NULL, '$2y$10$Qmh4WQGWdj.XElWxrOkKD./yTWR70mW.l.0655xTEkxSQgOkzaJRG', 0, 1, NULL, NULL, NULL, '$2y$10$Qmh4WQGWdj.XElWxrOkKD./yTWR70mW.l.0655xTEkxSQgOkzaJRG'),
(15, 'teste', 'esquilo@admin.com', NULL, '$2y$10$Qmh4WQGWdj.XElWxrOkKD./yTWR70mW.l.0655xTEkxSQgOkzaJRG', 0, 1, NULL, NULL, NULL, '$2y$10$Qmh4WQGWdj.XElWxrOkKD./yTWR70mW.l.0655xTEkxSQgOkzaJRG');

-- --------------------------------------------------------

--
-- Estrutura para tabela `afiliados`
--

CREATE TABLE `afiliados` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `code` varchar(64) NOT NULL,
  `visitors` int(11) DEFAULT '0',
  `registrations` int(11) DEFAULT '0',
  `depositors` int(11) DEFAULT '0',
  `deposited` decimal(12,2) DEFAULT '0.00',
  `earned` decimal(12,2) DEFAULT '0.00',
  `available` decimal(12,2) DEFAULT '0.00',
  `earners` json DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `__v` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura para tabela `afiliados_config`
--

CREATE TABLE `afiliados_config` (
  `id` int(11) NOT NULL,
  `cpaLvl1` decimal(10,2) DEFAULT NULL,
  `cpaLvl2` decimal(10,2) DEFAULT NULL,
  `cpaLvl3` decimal(10,2) DEFAULT NULL,
  `chanceCpa` decimal(5,2) DEFAULT NULL,
  `revShareFalso` decimal(5,2) DEFAULT NULL,
  `revShareLvl1` decimal(5,2) DEFAULT NULL,
  `revShareLvl2` decimal(5,2) DEFAULT NULL,
  `revShareLvl3` decimal(5,2) DEFAULT NULL,
  `minDepForCpa` decimal(10,2) DEFAULT NULL,
  `minResgate` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `afiliados_config`
--

INSERT INTO `afiliados_config` (`id`, `cpaLvl1`, `cpaLvl2`, `cpaLvl3`, `chanceCpa`, `revShareFalso`, `revShareLvl1`, `revShareLvl2`, `revShareLvl3`, `minDepForCpa`, `minResgate`) VALUES
(1, 50.00, 0.00, 0.00, 100.00, 0.00, 0.00, 0.00, 0.00, 5.00, 50.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `img` text NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `banner`
--

INSERT INTO `banner` (`id`, `titulo`, `criado_em`, `img`, `link`, `status`) VALUES
(2, 'BANNER 2 TELA INICAL', '2025-07-23 11:20:09', 'tmp/imagens/banner_68809b392216b.webp', 'http://localhost:8000', 1),
(4, 'BANNER 1 TELA INICAL', '2025-07-23 19:32:47', 'tmp/imagens/banner_68810eaff2f61.webp', '', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `bau`
--

CREATE TABLE `bau` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `num` text,
  `status` varchar(20) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `is_get` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `bau`
--

INSERT INTO `bau` (`id`, `id_user`, `num`, `status`, `token`, `is_get`) VALUES
(0, 510462046, '1', 'completed', 'a7e7ffe43fbc8cbeb25a0db4a5a5b31c8e5cc6c76e7bee5bd6f1d58b394ea1b5', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `bau_config`
--

CREATE TABLE `bau_config` (
  `id` int(11) NOT NULL,
  `nivel` int(11) NOT NULL,
  `indicacoes_necessarias` int(11) NOT NULL,
  `premio` decimal(10,2) NOT NULL,
  `deposito_minimo` decimal(10,2) NOT NULL DEFAULT '10.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `bau_config`
--

INSERT INTO `bau_config` (`id`, `nivel`, `indicacoes_necessarias`, `premio`, `deposito_minimo`) VALUES
(1, 1, 5, 10.00, 10.00),
(2, 2, 10, 20.00, 10.00),
(3, 3, 30, 40.00, 10.00),
(4, 4, 40, 50.00, 10.00),
(5, 5, 50, 60.00, 10.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `caixa_premiacoes_log`
--

CREATE TABLE `caixa_premiacoes_log` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `acao` enum('ativar','desativar','adicionar_valor','definir_porcentagem') NOT NULL,
  `valor` decimal(12,2) DEFAULT NULL,
  `porcentagem` decimal(5,2) DEFAULT NULL,
  `datahora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `observacao` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura para tabela `caixa_premiacoes_status`
--

CREATE TABLE `caixa_premiacoes_status` (
  `id` int(11) NOT NULL DEFAULT '1',
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `valor_atual` decimal(12,2) NOT NULL DEFAULT '0.00',
  `porcentagem_distribuicao` decimal(5,2) NOT NULL DEFAULT '0.00',
  `ultima_atualizacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `caixa_premiacoes_status`
--

INSERT INTO `caixa_premiacoes_status` (`id`, `ativo`, `valor_atual`, `porcentagem_distribuicao`, `ultima_atualizacao`) VALUES
(1, 1, 838.52, 50.00, '2025-08-26 14:41:23');

-- --------------------------------------------------------

--
-- Estrutura para tabela `config`
--

CREATE TABLE `config` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `nome_site` text,
  `descricao` text,
  `grupoplataforma` varchar(255) DEFAULT NULL,
  `logo` text,
  `avatar` text,
  `download` varchar(255) DEFAULT NULL,
  `icone_download` varchar(255) DEFAULT NULL,
  `telegram` text,
  `instagram` text,
  `whatsapp` text,
  `suporte` text,
  `email` varchar(45) DEFAULT NULL,
  `sublogo` text,
  `facebookads` text,
  `rodapelogo` text,
  `favicon` text,
  `googleAnalytics` text,
  `minplay` int(11) DEFAULT NULL,
  `minsaque` double DEFAULT NULL,
  `maxsaque` int(11) DEFAULT '1000',
  `saque_automatico` int(11) NOT NULL,
  `rollover` int(11) DEFAULT NULL,
  `mindep` text,
  `jackpot` int(11) DEFAULT NULL,
  `navbar` int(11) DEFAULT NULL,
  `numero_jackpot` int(11) DEFAULT NULL,
  `jackpot_custom` text,
  `cor_padrao` varchar(45) NOT NULL,
  `background_padrao` varchar(50) DEFAULT NULL,
  `custom_css` longtext NOT NULL,
  `texto` varchar(45) NOT NULL,
  `img_seo` text,
  `btn_deposit` text,
  `btn_play` text,
  `btn_receive` text,
  `gamebg` text,
  `ui_share` text,
  `ui_social` text,
  `ui_support` text,
  `keyword` text,
  `marquee` text,
  `status_topheader` int(11) NOT NULL DEFAULT '0',
  `cor_topheader` varchar(48) DEFAULT '#ed1c24',
  `niveisbau` text,
  `qntsbaus` int(11) DEFAULT NULL,
  `nvlbau` int(11) DEFAULT NULL,
  `pessoasbau` int(11) DEFAULT NULL,
  `tema` int(11) DEFAULT NULL,
  `versao_app_android` text,
  `versao_app_ios` text,
  `mensagem_app` text,
  `link_app_android` text,
  `link_app_ios` text,
  `broadcast` text,
  `limite_saque` int(11) DEFAULT '0',
  `sort_jackpot` int(11) DEFAULT '1',
  `carregamento_img` varchar(255) DEFAULT NULL,
  `imagem_fundo` text,
  `snow_flakes` text,
  `painel_rolante` text,
  `atendimento` text,
  `jackpot_ativado` int(11) NOT NULL DEFAULT '1',
  `limite_de_chaves` int(11) NOT NULL DEFAULT '1',
  `facebook` varchar(255) DEFAULT NULL,
  `baixar_ativado` int(11) DEFAULT NULL,
  `topIconColor` varchar(255) DEFAULT NULL,
  `topBgColor` varchar(255) DEFAULT NULL,
  `tema_popup_inicio` int(11) NOT NULL DEFAULT '1',
  `slogan` text,
  `caixa_premiacoes` decimal(11,2) NOT NULL DEFAULT '0.00',
  `jivo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `config`
--

INSERT INTO `config` (`id`, `nome`, `nome_site`, `descricao`, `grupoplataforma`, `logo`, `avatar`, `download`, `icone_download`, `telegram`, `instagram`, `whatsapp`, `suporte`, `email`, `sublogo`, `facebookads`, `rodapelogo`, `favicon`, `googleAnalytics`, `minplay`, `minsaque`, `maxsaque`, `saque_automatico`, `rollover`, `mindep`, `jackpot`, `navbar`, `numero_jackpot`, `jackpot_custom`, `cor_padrao`, `background_padrao`, `custom_css`, `texto`, `img_seo`, `btn_deposit`, `btn_play`, `btn_receive`, `gamebg`, `ui_share`, `ui_social`, `ui_support`, `keyword`, `marquee`, `status_topheader`, `cor_topheader`, `niveisbau`, `qntsbaus`, `nvlbau`, `pessoasbau`, `tema`, `versao_app_android`, `versao_app_ios`, `mensagem_app`, `link_app_android`, `link_app_ios`, `broadcast`, `limite_saque`, `sort_jackpot`, `carregamento_img`, `imagem_fundo`, `snow_flakes`, `painel_rolante`, `atendimento`, `jackpot_ativado`, `limite_de_chaves`, `facebook`, `baixar_ativado`, `topIconColor`, `topBgColor`, `tema_popup_inicio`, `slogan`, `caixa_premiacoes`, `jivo`) VALUES
(1, 'Esquilo mania', 'EsquiloMania', 'SEO AQUI', 'GRUPO W1', 'storage/logo.png', 'img_682ea129718f89.38748903.avif', 'img_682ea129718424.90663712.avif', 'img_682ea129718778.14297111.avif', 'https://t.me/visionmidia', 'https://www.instagram.com/', 'http://whatsapp.com/', '', '', '', 'PIXEL AQUI', 'tmp/imagens/rodapelogo_688092d8be703.webp', 'storage/favicon.png', 'PIXEL AQUI', 1, 10, 50000, 0, 0, '10', 0, 1, 2, 'jackpot_682ea4afb197f.avif', '#18d2e7', '#35bfbc', '', '', NULL, 'storage/btn_deposit.png', 'storage/btn_play.png', 'storage/btn_receive.png', 'storage/gamebg.png', 'storage/ui_share.png', 'storage/ui_social.png', 'storage/ui_support.png', 'Palavras, chave, aqui', 'Clique no canal: Telegram Baixe o site oficial do APP: w1-caviarpg.com Bônus de primeiro depósito para novos usuários R$3777 B6nus de convite: R$ 10 por pessoa Convide amigos, compartilhe e ganhe dinheiro! Comissão até 2% Tempo de chuva do envelope: AS00H 15H 20H E22H  Passo a passo: Visite', 0, '#0096dd', '10,15,20,25,30,35,40,45,50', 32, 5, 5, 21, '1.0.0.1', '1.0.0.2', 'MENSAGEM POPUP', 'https://google.com/', 'https://google.com/', NULL, 50, 4, 'img_682ea129718c10.09902911.avif', 'img_67e3328b16f8f2.80383522.png', 'img_67e3329687bf85.95323411.png', '', 'https://t.me/suporteq', 1, 1, 'https://www.instagram.com/grupow1.oficial', 1, '', '', 1, 'SLOGAN QUE APARECE NA PESQUISA', 300.00, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `game_history`
--

CREATE TABLE `game_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `player_score` decimal(5,2) NOT NULL,
  `game_result` enum('win','perdeu','em_andamento') DEFAULT NULL,
  `prize_amount` decimal(10,2) DEFAULT '0.00',
  `fox_positions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura para tabela `lotuspay`
--

CREATE TABLE `lotuspay` (
  `id` int(11) NOT NULL,
  `token_secreto` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `lotuspay`
--

INSERT INTO `lotuspay` (`id`, `token_secreto`) VALUES
(1, 'lp_1234567890abcdef');

-- --------------------------------------------------------

--
-- Estrutura para tabela `historico_raspadas`
--

CREATE TABLE `historico_raspadas` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `scratch_card_id` int(11) NOT NULL,
  `scratch_card_name` varchar(255) NOT NULL,
  `scratch_card_slug` varchar(255) NOT NULL,
  `amount_paid` int(11) NOT NULL COMMENT 'Valor pago pela raspadinha em centavos',
  `prize_won` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT 'JSON com dados do prêmio ganho',
  `prize_amount` int(11) NOT NULL DEFAULT '0' COMMENT 'Valor do prêmio em centavos (0 se não ganhou)',
  `grid_result` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'JSON com o grid da raspadinha',
  `transaction_id` varchar(100) DEFAULT NULL COMMENT 'ID único da transação',
  `status` enum('completed','pending','cancelled') NOT NULL DEFAULT 'completed',
  `played_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Histórico de jogos de raspadinhas';

-- --------------------------------------------------------

--
-- Estrutura para tabela `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pay_valores_cassino`
--

CREATE TABLE `pay_valores_cassino` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tipo` int(11) NOT NULL DEFAULT '0' COMMENT '0: CPA / 1: REV / 2: GAMES',
  `data_time` datetime NOT NULL,
  `game` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura para tabela `premios`
--

CREATE TABLE `premios` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL COMMENT 'Valor do prêmio em centavos',
  `image` varchar(500) DEFAULT NULL,
  `type` enum('voucher','item') NOT NULL DEFAULT 'voucher',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `premios`
--

INSERT INTO `premios` (`id`, `name`, `amount`, `image`, `type`, `is_active`, `created_at`, `updated_at`) VALUES
(1, '1.000 Reais', 100000, 'https://ik.imagekit.io/azx3nlpdu/1K.png?updatedAt=1752865094958', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(2, '700 Reais', 70000, 'https://ik.imagekit.io/azx3nlpdu/700.png?updatedAt=1752856623225', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(3, '500 Reais', 50000, 'https://ik.imagekit.io/azx3nlpdu/500-REAIS.png?updatedAt=1752856623150', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(4, '200 Reais', 20000, 'https://ik.imagekit.io/azx3nlpdu/200-REAIS.png?updatedAt=1752865094953', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(5, '100 Reais', 10000, 'https://ik.imagekit.io/azx3nlpdu/Notas/100%20REAIS.png?updatedAt=1752047821876', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(6, '50 Reais', 5000, 'https://ik.imagekit.io/azx3nlpdu/Notas/50%20REAIS.png?updatedAt=1752047821745', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(7, '20 Reais', 2000, 'https://ik.imagekit.io/azx3nlpdu/Notas/20%20REAIS.png?updatedAt=1752047821716', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(8, '15 Reais', 1500, 'https://ik.imagekit.io/azx3nlpdu/Notas/15%20REAIS.png?updatedAt=1752047821835', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(9, '10 Reais', 1000, 'https://ik.imagekit.io/azx3nlpdu/Notas/10%20REAIS.png?updatedAt=1752047821681', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(10, '5 Reais', 500, 'https://ik.imagekit.io/azx3nlpdu/Notas/5%20REAIS.png?updatedAt=1752047821734', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(11, '4 Reais', 400, 'https://ik.imagekit.io/azx3nlpdu/Notas/4%20REAIS.png?updatedAt=1752047821875', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(12, '3 Reais', 300, 'https://ik.imagekit.io/azx3nlpdu/Notas/3%20REAIS.png?updatedAt=1752047821897', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(13, '2 Reais', 200, 'https://ik.imagekit.io/azx3nlpdu/Notas/2%20REAIS.png?updatedAt=1752047821644', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(14, '1 Real', 100, 'https://ik.imagekit.io/azx3nlpdu/Notas/1%20REAL.png?updatedAt=1752047821586', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(15, '0,50 Centavos', 50, 'https://ik.imagekit.io/azx3nlpdu/50-CENTAVOS-2.png?updatedAt=1752864509979', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(16, 'Smartwatch D20 Shock', 15000, 'https://ik.imagekit.io/azx3nlpdu/item_smartwatch_d20_shock.png?updatedAt=1751634892443', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(17, 'PowerBank', 6000, 'https://ik.imagekit.io/azx3nlpdu/banner/01K0F5KTMSEJBQF1STFZ4BCKXM.png', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(18, 'iPhone 15 Pro', 1100000, 'https://ik.imagekit.io/azx3nlpdu/variant_iphone_15_pro_256_gb_tit_nio_natural.png?updatedAt=1751634894188', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(19, 'Xbox Series X', 450000, 'https://ik.imagekit.io/azx3nlpdu/item_xbox_series_x.png?updatedAt=1751634892410', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(20, 'PlayStation 5', 400000, 'https://ik.imagekit.io/azx3nlpdu/item_playstation_5.png', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(21, 'Apple Watch Ultra 2', 900000, 'https://ik.imagekit.io/azx3nlpdu/variant_apple_watch_ultra_2_pulseira_loop_alpina_azul_p.png?updatedAt=1751634892598', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(22, 'Galaxy Z Flip5', 600000, 'https://ik.imagekit.io/azx3nlpdu/variant_galaxy_z_flip5_256_gb_creme.png?updatedAt=1751634892797', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(23, 'Notebook Dell G15', 450000, 'https://ik.imagekit.io/azx3nlpdu/item_notebook_g15.png?updatedAt=1751634891010', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(24, 'Smart TV 4K de 55 pol', 300000, 'https://ik.imagekit.io/azx3nlpdu/item_smart_tv_4k_55.png?updatedAt=1751634892461', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(25, 'Air Fryer', 85000, 'https://ik.imagekit.io/azx3nlpdu/item_air_fryer.png?updatedAt=1751634894630', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(26, 'Fone de ouvido Bluetooth', 17000, 'https://ik.imagekit.io/azx3nlpdu/item_fone_de_ouvido_bluetooth.png?updatedAt=1751634890865', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(27, 'Chinelo Havaianas branco', 3500, 'https://ik.imagekit.io/azx3nlpdu/item_chinelo_havaianas_top_branco.png?updatedAt=1751634896291', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(28, 'Copo Stanley preto', 16500, 'https://ik.imagekit.io/azx3nlpdu/item_copo_t_rmico_stanley_preto.png?updatedAt=1751634897660', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(29, 'Churrasqueira a gás versão Gourmet', 1500000, 'https://ik.imagekit.io/azx3nlpdu/item_churrasqueira_a_g_s_versia_gourmand.png?updatedAt=1751634896402', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(30, 'Moto Honda Biz 110i', 1300000, 'https://ik.imagekit.io/azx3nlpdu/variant_biz_110i_vermelho.png?updatedAt=1751634892737', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(31, 'Moto Honda Pop 110i', 1150000, 'https://ik.imagekit.io/azx3nlpdu/variant_pop_110i_branco.png?updatedAt=1751634894490', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(32, '10.000 Reais', 1000000, 'https://ik.imagekit.io/azx3nlpdu/5.png?updatedAt=1752731173073', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(33, 'Geladeira Frost Free', 750000, 'https://ik.imagekit.io/azx3nlpdu/item_geladeira_frost_free.png?updatedAt=1751634890810', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(34, 'Lava-louças', 400000, 'https://ik.imagekit.io/azx3nlpdu/item_lava_lou_a_samsung.png?updatedAt=1751634890781', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(35, 'Controle Xbox amarelo (Electric Volt)', 50000, 'https://ik.imagekit.io/azx3nlpdu/item_controle_xbox_eletric_volt.png?updatedAt=1751634897634', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(36, 'Controle DualSense Midnight Black', 47000, 'https://ik.imagekit.io/azx3nlpdu/item_controle_dualsense_playstation_midnight_black.png?updatedAt=1751634897303', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(37, 'Caixa de som JBL Boombox 3', 250000, 'https://ik.imagekit.io/azx3nlpdu/variant_jbl_boombox_3_black.png?updatedAt=1751634894498', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(38, 'iPhone 12', 250000, 'https://ik.imagekit.io/azx3nlpdu/item_iphone_12.png?updatedAt=1751634890863', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(39, 'Smartphone modelo C2 NK109', 80000, 'https://ik.imagekit.io/azx3nlpdu/item_c2_nk109.png?updatedAt=1751634895731', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(40, 'Bola de futebol tamanho 5', 50000, 'https://ik.imagekit.io/azx3nlpdu/item_ft_5_branca_e_preta.png?updatedAt=1751634891004', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(41, 'Perfume 212 VIP Black', 39900, 'https://ik.imagekit.io/azx3nlpdu/item_212_vip_black.png?updatedAt=1751634894437', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(42, 'Camisa de time de futebol', 35000, 'https://ik.imagekit.io/azx3nlpdu/item_camisa_do_seu_time.png?updatedAt=1751634896240', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(43, 'Fone de ouvido Lenovo', 22000, 'https://ik.imagekit.io/azx3nlpdu/item_fone_de_ouvido_lenovo.png?updatedAt=1751634891006', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(44, 'Copo Stanley preto', 16500, 'https://ik.imagekit.io/azx3nlpdu/item_copo_t_rmico_stanley_preto.png?updatedAt=1751634897660', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(45, '5.000 Reais', 500000, 'https://ik.imagekit.io/azx3nlpdu/1K.png?updatedAt=1752731172984', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(46, 'iPhone 15', 500000, 'https://ik.imagekit.io/azx3nlpdu/variant_iphone_15_azul.png?updatedAt=1751634894131', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(47, 'Ipad 10\'', 280000, 'https://ik.imagekit.io/azx3nlpdu/banner/01K0F5PZ9SF4ZJ5G1GZCS0VG5J.png', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(48, 'Apple AirPods 3ª geração', 190000, 'https://ik.imagekit.io/azx3nlpdu/item_airpods_3_gera_o.png?updatedAt=1751634894740', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(49, 'Adaptador de energia USB tipo C', 22000, 'https://ik.imagekit.io/azx3nlpdu/item_adaptador_de_energia_usb_c.png?updatedAt=1751634894561', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(50, 'Copo Stanley rosa', 16500, 'https://ik.imagekit.io/azx3nlpdu/item_copo_t_rmico_stanley_rosa.png?updatedAt=1751634897689', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(51, '20.000 Reais', 2000000, 'https://ik.imagekit.io/azx3nlpdu/2K.png?updatedAt=1752731173023', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(52, 'Moto CG 160 Start', 1650000, 'https://ik.imagekit.io/azx3nlpdu/variant_cg_160_start_prata_met_lico.png?updatedAt=1751634892520', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(53, 'iPhone 15 Pro Max', 950000, 'https://ik.imagekit.io/azx3nlpdu/variant_iphone_15_pro_max_256_gb_nio_preto.png?updatedAt=1751634894448', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(54, 'Churrasqueira a gás GS Performance', 500000, 'https://ik.imagekit.io/azx3nlpdu/item_churrasqueira_a_g_s_performance_340s.png?updatedAt=1751634896209', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(55, 'Air Force 1 x AMBUSH', 170000, 'https://ik.imagekit.io/azx3nlpdu/banner/01K0BE361JPAF8XF1EN809MNGA.png', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(56, 'Air Force 1 Low Retro', 120000, 'https://ik.imagekit.io/azx3nlpdu/banner/01K0BE42XDSF6D848QM4WE2PT0.png', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(57, 'Air Jordan 1 Low Purple', 110000, 'https://ik.imagekit.io/azx3nlpdu/banner/01K0BE23ABKKVX1FX13S28EW8H.png', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(58, 'Capinha transparente para iPhone 15', 3000, 'https://ik.imagekit.io/azx3nlpdu/item_capinha_trasparente_iphone_15_pro_max.png?updatedAt=1751634896274', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(59, '50.000 Reais', 5000000, 'https://ik.imagekit.io/azx3nlpdu/10.png?updatedAt=1752731173064', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(60, 'Churrasqueira cerâmica a carvão', 2000000, 'https://ik.imagekit.io/azx3nlpdu/item_churrasqueira_cer_mica_carv_o.png?updatedAt=1751634896778', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(61, 'Motorola Edge 40 Neo', 280000, 'https://ik.imagekit.io/azx3nlpdu/variant_edge_40_neo_256_gb_black_beauty.png?updatedAt=1751634892779', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(62, '100.000 Reais', 10000000, 'https://ik.imagekit.io/azx3nlpdu/100K.png?updatedAt=1752731173256', 'voucher', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(63, 'Harley-Davidson Sportster S', 10500000, 'https://ik.imagekit.io/azx3nlpdu/variant_sportster_s_vivid_black.png?updatedAt=1751634893016', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(64, 'Corvette Stingray', 55000000, 'https://ik.imagekit.io/azx3nlpdu/variant_corvette_stingray_c8_rapid_blue.png?updatedAt=1751634893325', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(65, 'iPhone 16 Pro Max 1TB', 1280000, 'https://ik.imagekit.io/azx3nlpdu/variant_iphone_16_pro_max_1_tb_titanio_natural.png?updatedAt=1751634894639', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(66, 'MacBook Pro 16\"', 3500000, 'https://ik.imagekit.io/azx3nlpdu/variant_macbook_pro_16_m4_pro_space_black.png?updatedAt=1751634894832', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(67, 'PlayStation 5 Pro', 450000, 'https://ik.imagekit.io/azx3nlpdu/variant_playstation_5_pro_2_tb.png?updatedAt=1751634895009', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(68, 'TV Samsung 75\" QLED 8K', 800000, 'https://ik.imagekit.io/azx3nlpdu/variant_smart_tv_75_qled_8k_samsung_qn75qn700c.png?updatedAt=1751634895190', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(69, 'Xbox Series X', 380000, 'https://ik.imagekit.io/azx3nlpdu/variant_xbox_series_x_1_tb.png?updatedAt=1751634895364', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(70, 'Air Jordan 1 High OG Chicago', 220000, 'https://ik.imagekit.io/azx3nlpdu/banner/01K0BE4P5KFPSNJTTF80MRVHQ8.png', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(71, 'Air Jordan 4 Retro Thunder', 200000, 'https://ik.imagekit.io/azx3nlpdu/banner/01K0BE2P1AA1N8DQQSKZM9ET8B.png', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(72, 'Dunk Low Retro White Black', 100000, 'https://ik.imagekit.io/azx3nlpdu/banner/01K0BE23J0HCPGNZ5M0T25R3SH.png', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(73, 'AirPods Pro 2ª geração', 250000, 'https://ik.imagekit.io/azx3nlpdu/variant_airpods_pro_2_gera_o.png?updatedAt=1751634896035', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47'),
(74, 'Apple Watch Series 10', 500000, 'https://ik.imagekit.io/azx3nlpdu/variant_apple_watch_series_10_gps_45_mm_aluminum_jet_black.png?updatedAt=1751634896160', 'item', 1, '2025-07-22 10:41:47', '2025-07-22 10:41:47');

-- --------------------------------------------------------

--
-- Estrutura para tabela `raspadinhas`
--

CREATE TABLE `raspadinhas` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `amount` int(11) NOT NULL COMMENT 'Valor em centavos para jogar',
  `max_reward` int(11) NOT NULL COMMENT 'Máximo prêmio em centavos',
  `slug` varchar(100) NOT NULL,
  `banner` varchar(500) DEFAULT NULL,
  `start_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `grid_size` int(11) DEFAULT '3',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `raspadinhas`
--

INSERT INTO `raspadinhas` (`id`, `name`, `description`, `amount`, `max_reward`, `slug`, `banner`, `start_at`, `expires_at`, `grid_size`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Centavo Da Sore', 'Uma moedinha pode valer mil no PIX. Vai ficar de fora?', 50, 100000, 'centavo-da-sorte', 'https://ik.imagekit.io/azx3nlpdu/scratch-card/01K0FF7ZDNXFVAFJ6R79MX2ZZ5.png', '2025-07-18 00:00:00', NULL, 3, 1, '2025-07-22 10:41:47', '2025-08-01 15:12:16'),
(2, 'Sorte instantanea', 'Raspou, ganhou, sacou!', 100, 250000, 'sorte-instantanea', 'https://ik.imagekit.io/azx3nlpdu/scratch-card/01K0FH5P70HZV4PV88Y9KV06PA.jpg', '2025-07-18 00:00:00', NULL, 3, 1, '2025-07-22 10:41:47', '2025-08-01 15:12:20'),
(3, 'Raspadinha Suprema', 'Seu bilhete para prêmios de verdade.', 250, 500000, 'raspadinha-suprema', 'https://ik.imagekit.io/azx3nlpdu/scratch-card/01K0FJA0JE70JMW0Y30HMFCP46.jpg', '2025-07-18 00:00:00', NULL, 3, 1, '2025-07-22 10:41:47', '2025-08-01 15:13:44'),
(4, 'Raspa Relampago', 'Com um lanche você pode ganhar um Playstation!', 500, 1500000, 'raspa-relampago', 'https://ik.imagekit.io/azx3nlpdu/scratch-card/01K0F77Z6HB3SZ5C9HEH3TQ90W.jpg', '2025-07-18 00:00:00', NULL, 3, 1, '2025-07-22 10:41:47', '2025-08-01 15:12:33'),
(5, 'Raspadinha Magica', 'Raspadinhas online com pagamentos instantâneos no seu Pix.', 5000, 3000000, 'premios-em-dinheiro-todos-os-dias', 'https://ik.imagekit.io/azx3nlpdu/BIKE%20,%20MAQUINA%20-%20MOTO.png?updatedAt=1752534650346', '2025-07-14 00:00:00', NULL, 3, 1, '2025-07-22 10:41:47', '2025-08-01 15:13:50'),
(6, 'Raspe e Ganhe', 'Transforme sua sorte em dinheiro de verdade com cada raspada.', 10000, 6000000, 'raspou-caiu-na-conta', 'https://ik.imagekit.io/azx3nlpdu/PREMIOS%20DIVERSOS.png?updatedAt=1752534650509', '2025-07-14 00:00:00', NULL, 3, 1, '2025-07-22 10:41:47', '2025-08-01 19:56:39');

-- --------------------------------------------------------

--
-- Estrutura para tabela `raspadinhas_premios`
--

CREATE TABLE `raspadinhas_premios` (
  `id` int(11) NOT NULL,
  `scratch_card_id` int(11) NOT NULL,
  `reward_id` int(11) NOT NULL,
  `probability` decimal(8,6) NOT NULL COMMENT 'Probabilidade de ganhar este prêmio (0 a 1)',
  `sort_order` int(11) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `raspadinhas_premios`
--

INSERT INTO `raspadinhas_premios` (`id`, `scratch_card_id`, `reward_id`, `probability`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 1, 1, 0.001000, 1, 1, '2025-07-22 10:41:47'),
(2, 1, 2, 0.002000, 2, 1, '2025-07-22 10:41:47'),
(3, 1, 3, 0.005000, 3, 1, '2025-07-22 10:41:47'),
(4, 1, 4, 0.010000, 4, 1, '2025-07-22 10:41:47'),
(5, 1, 16, 0.015000, 5, 1, '2025-07-22 10:41:47'),
(6, 1, 5, 0.020000, 6, 1, '2025-07-22 10:41:47'),
(7, 1, 17, 0.025000, 7, 1, '2025-07-22 10:41:47'),
(8, 1, 6, 0.030000, 8, 1, '2025-07-22 10:41:47'),
(9, 1, 7, 0.040000, 9, 1, '2025-07-22 10:41:47'),
(10, 1, 8, 0.050000, 10, 1, '2025-07-22 10:41:47'),
(11, 1, 9, 0.070000, 11, 1, '2025-07-22 10:41:47'),
(12, 1, 10, 0.100000, 12, 1, '2025-07-22 10:41:47'),
(13, 1, 11, 0.120000, 13, 1, '2025-07-22 10:41:47'),
(14, 1, 12, 0.150000, 14, 1, '2025-07-22 10:41:47'),
(15, 1, 13, 0.200000, 15, 1, '2025-07-22 10:41:47'),
(16, 1, 14, 0.152000, 16, 1, '2025-07-22 10:41:47'),
(17, 1, 15, 0.200000, 17, 1, '2025-07-22 10:41:47'),
(18, 2, 28, 0.001000, 1, 1, '2025-07-22 10:41:47'),
(19, 2, 29, 0.001000, 2, 1, '2025-07-22 10:41:47'),
(20, 2, 1, 0.003000, 3, 1, '2025-07-22 10:41:47'),
(21, 2, 30, 0.005000, 4, 1, '2025-07-22 10:41:47'),
(22, 2, 2, 0.007000, 5, 1, '2025-07-22 10:41:47'),
(23, 2, 31, 0.010000, 6, 1, '2025-07-22 10:41:47'),
(24, 2, 32, 0.015000, 7, 1, '2025-07-22 10:41:47'),
(25, 2, 33, 0.020000, 8, 1, '2025-07-22 10:41:47'),
(26, 2, 34, 0.025000, 9, 1, '2025-07-22 10:41:47'),
(27, 2, 4, 0.030000, 10, 1, '2025-07-22 10:41:47'),
(28, 2, 35, 0.035000, 11, 1, '2025-07-22 10:41:47'),
(29, 2, 5, 0.050000, 12, 1, '2025-07-22 10:41:47'),
(30, 2, 17, 0.060000, 13, 1, '2025-07-22 10:41:47'),
(31, 2, 6, 0.080000, 14, 1, '2025-07-22 10:41:47'),
(32, 2, 27, 0.100000, 15, 1, '2025-07-22 10:41:47'),
(33, 2, 9, 0.120000, 16, 1, '2025-07-22 10:41:47'),
(34, 2, 10, 0.140000, 17, 1, '2025-07-22 10:41:47'),
(35, 2, 12, 0.150000, 18, 1, '2025-07-22 10:41:47'),
(36, 2, 13, 0.158000, 19, 1, '2025-07-22 10:41:47'),
(37, 2, 14, 0.180000, 20, 1, '2025-07-22 10:41:47'),
(38, 3, 36, 0.000500, 1, 1, '2025-07-22 10:41:47'),
(39, 3, 37, 0.000500, 2, 1, '2025-07-22 10:41:47'),
(40, 3, 22, 0.001000, 3, 1, '2025-07-22 10:41:47'),
(41, 3, 20, 0.001000, 4, 1, '2025-07-22 10:41:47'),
(42, 3, 23, 0.002000, 5, 1, '2025-07-22 10:41:47'),
(43, 3, 38, 0.003000, 6, 1, '2025-07-22 10:41:47'),
(44, 3, 28, 0.005000, 7, 1, '2025-07-22 10:41:47'),
(45, 3, 39, 0.007000, 8, 1, '2025-07-22 10:41:47'),
(46, 3, 1, 0.010000, 9, 1, '2025-07-22 10:41:47'),
(47, 3, 24, 0.015000, 10, 1, '2025-07-22 10:41:47'),
(48, 3, 2, 0.020000, 11, 1, '2025-07-22 10:41:47'),
(49, 3, 3, 0.030000, 12, 1, '2025-07-22 10:41:47'),
(50, 3, 40, 0.040000, 13, 1, '2025-07-22 10:41:47'),
(51, 3, 4, 0.050000, 14, 1, '2025-07-22 10:41:47'),
(52, 3, 25, 0.060000, 15, 1, '2025-07-22 10:41:47'),
(53, 3, 41, 0.070000, 16, 1, '2025-07-22 10:41:47'),
(54, 3, 16, 0.080000, 17, 1, '2025-07-22 10:41:47'),
(55, 3, 5, 0.100000, 18, 1, '2025-07-22 10:41:47'),
(56, 3, 17, 0.120000, 19, 1, '2025-07-22 10:41:47'),
(57, 3, 6, 0.150000, 20, 1, '2025-07-22 10:41:47'),
(58, 3, 7, 0.180000, 21, 1, '2025-07-22 10:41:47'),
(59, 3, 10, 0.200000, 22, 1, '2025-07-22 10:41:47'),
(60, 3, 13, 0.225000, 23, 1, '2025-07-22 10:41:47'),
(61, 3, 14, 0.219500, 24, 1, '2025-07-22 10:41:47'),
(62, 4, 42, 0.000100, 1, 1, '2025-07-22 10:41:47'),
(63, 4, 43, 0.000200, 2, 1, '2025-07-22 10:41:47'),
(64, 4, 44, 0.000300, 3, 1, '2025-07-22 10:41:47'),
(65, 4, 18, 0.000400, 4, 1, '2025-07-22 10:41:47'),
(66, 4, 45, 0.000500, 5, 1, '2025-07-22 10:41:47'),
(67, 4, 21, 0.001000, 6, 1, '2025-07-22 10:41:47'),
(68, 4, 46, 0.002000, 7, 1, '2025-07-22 10:41:47'),
(69, 4, 22, 0.003000, 8, 1, '2025-07-22 10:41:47'),
(70, 4, 36, 0.005000, 9, 1, '2025-07-22 10:41:47'),
(71, 4, 19, 0.007000, 10, 1, '2025-07-22 10:41:47'),
(72, 4, 20, 0.007000, 11, 1, '2025-07-22 10:41:47'),
(73, 4, 47, 0.010000, 12, 1, '2025-07-22 10:41:47'),
(74, 4, 2, 0.015000, 13, 1, '2025-07-22 10:41:47'),
(75, 4, 3, 0.025000, 14, 1, '2025-07-22 10:41:47'),
(76, 4, 48, 0.030000, 15, 1, '2025-07-22 10:41:47'),
(77, 4, 49, 0.035000, 16, 1, '2025-07-22 10:41:47'),
(78, 4, 4, 0.050000, 17, 1, '2025-07-22 10:41:47'),
(79, 4, 25, 0.070000, 18, 1, '2025-07-22 10:41:47'),
(80, 4, 5, 0.100000, 19, 1, '2025-07-22 10:41:47'),
(81, 4, 6, 0.150000, 20, 1, '2025-07-22 10:41:47'),
(82, 4, 8, 0.180000, 21, 1, '2025-07-22 10:41:47'),
(83, 4, 9, 0.200000, 22, 1, '2025-07-22 10:41:47'),
(84, 4, 10, 0.220000, 23, 1, '2025-07-22 10:41:47'),
(85, 4, 13, 0.084600, 24, 1, '2025-07-22 10:41:47'),
(86, 5, 50, 0.000010, 1, 1, '2025-07-22 10:41:47'),
(87, 5, 51, 0.000050, 2, 1, '2025-07-22 10:41:47'),
(88, 5, 43, 0.000100, 3, 1, '2025-07-22 10:41:47'),
(89, 5, 44, 0.000100, 4, 1, '2025-07-22 10:41:47'),
(90, 5, 18, 0.000200, 5, 1, '2025-07-22 10:41:47'),
(91, 5, 45, 0.000300, 6, 1, '2025-07-22 10:41:47'),
(92, 5, 52, 0.000500, 7, 1, '2025-07-22 10:41:47'),
(93, 5, 46, 0.001000, 8, 1, '2025-07-22 10:41:47'),
(94, 5, 21, 0.001000, 9, 1, '2025-07-22 10:41:47'),
(95, 5, 53, 0.002000, 10, 1, '2025-07-22 10:41:47'),
(96, 5, 37, 0.003000, 11, 1, '2025-07-22 10:41:47'),
(97, 5, 36, 0.005000, 12, 1, '2025-07-22 10:41:47'),
(98, 5, 20, 0.007000, 13, 1, '2025-07-22 10:41:47'),
(99, 5, 29, 0.010000, 14, 1, '2025-07-22 10:41:47'),
(100, 5, 39, 0.015000, 15, 1, '2025-07-22 10:41:47'),
(101, 5, 54, 0.020000, 16, 1, '2025-07-22 10:41:47'),
(102, 5, 55, 0.025000, 17, 1, '2025-07-22 10:41:47'),
(103, 5, 56, 0.030000, 18, 1, '2025-07-22 10:41:47'),
(104, 5, 1, 0.040000, 19, 1, '2025-07-22 10:41:47'),
(105, 5, 2, 0.050000, 20, 1, '2025-07-22 10:41:47'),
(106, 5, 3, 0.070000, 21, 1, '2025-07-22 10:41:47'),
(107, 5, 5, 0.100000, 22, 1, '2025-07-22 10:41:47'),
(108, 5, 6, 0.150000, 23, 1, '2025-07-22 10:41:47'),
(109, 5, 57, 0.200000, 24, 1, '2025-07-22 10:41:47'),
(110, 5, 9, 0.250000, 25, 1, '2025-07-22 10:41:47'),
(111, 5, 10, 0.200000, 26, 1, '2025-07-22 10:41:47'),
(112, 5, 14, 0.028600, 27, 1, '2025-07-22 10:41:47'),
(113, 6, 58, 0.000005, 1, 1, '2025-07-22 10:41:47'),
(114, 6, 59, 0.000006, 2, 1, '2025-07-22 10:41:47'),
(115, 6, 50, 0.000003, 3, 1, '2025-07-22 10:41:47'),
(116, 6, 51, 0.000005, 4, 1, '2025-07-22 10:41:47'),
(117, 6, 43, 0.000008, 5, 1, '2025-07-22 10:41:47'),
(118, 6, 44, 0.000010, 6, 1, '2025-07-22 10:41:47'),
(119, 6, 52, 0.000020, 7, 1, '2025-07-22 10:41:47'),
(120, 6, 45, 0.000030, 8, 1, '2025-07-22 10:41:47'),
(121, 6, 18, 0.000050, 9, 1, '2025-07-22 10:41:47'),
(122, 6, 22, 0.000080, 10, 1, '2025-07-22 10:41:47'),
(123, 6, 37, 0.000100, 11, 1, '2025-07-22 10:41:47'),
(124, 6, 53, 0.000200, 12, 1, '2025-07-22 10:41:47'),
(125, 6, 36, 0.000300, 13, 1, '2025-07-22 10:41:47'),
(126, 6, 20, 0.000500, 14, 1, '2025-07-22 10:41:47'),
(127, 6, 60, 0.001000, 15, 1, '2025-07-22 10:41:47'),
(128, 6, 1, 0.002000, 16, 1, '2025-07-22 10:41:47'),
(129, 6, 2, 0.003000, 17, 1, '2025-07-22 10:41:47'),
(130, 6, 3, 0.005000, 18, 1, '2025-07-22 10:41:47'),
(131, 6, 49, 0.008000, 19, 1, '2025-07-22 10:41:47'),
(132, 6, 25, 0.015000, 20, 1, '2025-07-22 10:41:47'),
(133, 6, 5, 0.030000, 21, 1, '2025-07-22 10:41:47'),
(134, 6, 6, 0.050000, 22, 1, '2025-07-22 10:41:47'),
(135, 6, 9, 0.880000, 23, 1, '2025-07-22 10:41:47');

-- --------------------------------------------------------

--
-- Estrutura para tabela `solicitacao_saques`
--

CREATE TABLE `solicitacao_saques` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `transacao_id` text NOT NULL,
  `valor` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tipo` text NOT NULL,
  `pix` text NOT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `data_registro` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `data_att` datetime DEFAULT NULL,
  `tipo_saque` int(11) NOT NULL DEFAULT '0' COMMENT '0: cassino / 1: afiliados'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura para tabela `transacoes`
--

CREATE TABLE `transacoes` (
  `id` int(11) NOT NULL,
  `transacao_id` varchar(255) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `tipo` enum('deposito','saque') DEFAULT NULL,
  `data_registro` datetime DEFAULT NULL,
  `qrcode` longtext,
  `code` text,
  `status` enum('pago','processamento','expirado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `transacoes_afiliados`
--

CREATE TABLE `transacoes_afiliados` (
  `id` int(11) NOT NULL,
  `afiliado_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tipo` enum('cpa','revshare') NOT NULL,
  `valor` decimal(12,2) NOT NULL,
  `descricao` text NOT NULL,
  `status` enum('pendente','aprovado','rejeitado') DEFAULT 'pendente',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` text,
  `usuario` text,
  `celular` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `saldo` decimal(10,2) DEFAULT '0.00',
  `saldo_comissao` decimal(11,2) NOT NULL DEFAULT '0.00',
  `url` varchar(255) NOT NULL,
  `codigo_convite` varchar(255) DEFAULT NULL,
  `invitation_code` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `data_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `cpf` varchar(11) DEFAULT NULL,
  `total_aberto` decimal(10,2) DEFAULT '0.00',
  `twofa_secret` varchar(64) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `influenciador` int(11) NOT NULL DEFAULT '0',
  `afiliado` int(11) DEFAULT '0',
  `cpaLvl1` decimal(10,2) DEFAULT NULL,
  `cpaLvl2` decimal(10,2) DEFAULT NULL,
  `cpaLvl3` decimal(10,2) DEFAULT NULL,
  `chanceCpa` decimal(5,2) DEFAULT NULL,
  `revShareFalso` decimal(5,2) DEFAULT NULL,
  `revShareLvl1` decimal(5,2) DEFAULT NULL,
  `revShareLvl2` decimal(5,2) DEFAULT NULL,
  `revShareLvl3` decimal(5,2) DEFAULT NULL,
  `minDepForCpa` decimal(10,2) DEFAULT NULL,
  `minResgate` decimal(10,2) DEFAULT NULL,
  `id_xgate` varchar(255) DEFAULT NULL,
  `lucro_limite_atingido` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `valores_config`
--

CREATE TABLE `valores_config` (
  `id` int(11) NOT NULL,
  `deposito_min` decimal(10,2) DEFAULT NULL,
  `deposito_max` decimal(10,2) DEFAULT NULL,
  `saque_min` decimal(10,2) DEFAULT NULL,
  `saque_max` decimal(10,2) DEFAULT NULL,
  `deposito_dobro` int(11) NOT NULL DEFAULT '0',
  `rollover` decimal(10,2) DEFAULT '0.00',
  `lucro_maximo_multiplicador` decimal(10,2) DEFAULT '2.00',
  `probabilidade_derrota_apos_lucro` int(11) DEFAULT '95',
  `deposito_minimo_reset_lucro` decimal(10,2) DEFAULT '10.00',
  `multiplicador_maximo_global` decimal(10,2) DEFAULT '5.00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `valores_config`
--

INSERT INTO `valores_config` (`id`, `deposito_min`, `deposito_max`, `saque_min`, `saque_max`, `deposito_dobro`, `rollover`, `lucro_maximo_multiplicador`, `probabilidade_derrota_apos_lucro`, `deposito_minimo_reset_lucro`, `multiplicador_maximo_global`) VALUES
(1, 10.00, 10000.00, 10.00, 1000.00, 0, 1.00, 2.00, 80, 10.00, 1.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `visita_site`
--

CREATE TABLE `visita_site` (
  `id` int(11) NOT NULL,
  `nav_os` text COLLATE utf8mb4_unicode_ci,
  `mac_os` text COLLATE utf8mb4_unicode_ci,
  `ip_visita` text COLLATE utf8mb4_unicode_ci,
  `refer_visita` text COLLATE utf8mb4_unicode_ci,
  `data_cad` date DEFAULT NULL,
  `hora_cad` time DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `pais` text COLLATE utf8mb4_unicode_ci,
  `cidade` text COLLATE utf8mb4_unicode_ci,
  `estado` text COLLATE utf8mb4_unicode_ci,
  `ads_tipo` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `webhook`
--

CREATE TABLE `webhook` (
  `id` int(11) NOT NULL,
  `nome` text NOT NULL,
  `bot_id` varchar(255) NOT NULL,
  `chat_id` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `webhook`
--

INSERT INTO `webhook` (`id`, `nome`, `bot_id`, `chat_id`, `status`) VALUES
(1, 'Cadastros e Pixs2', '7850512325:AAGDZ6BwDXdklk4G9ot1D234iCVUMzhuR70', '-4903425115', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `active_sessions`
--
ALTER TABLE `active_sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_id` (`session_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `last_activity` (`last_activity`),
  ADD KEY `ip_address` (`ip_address`);

--
-- Índices de tabela `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `afiliados`
--
ALTER TABLE `afiliados`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `afiliados_config`
--
ALTER TABLE `afiliados_config`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `bau`
--
ALTER TABLE `bau`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `bau_config`
--
ALTER TABLE `bau_config`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `caixa_premiacoes_status`
--
ALTER TABLE `caixa_premiacoes_status`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `game_history`
--
ALTER TABLE `game_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `created_at` (`created_at`);

--
-- Índices de tabela `lotuspay`
--
ALTER TABLE `lotuspay`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `historico_raspadas`
--
ALTER TABLE `historico_raspadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_scratch_card_id` (`scratch_card_id`),
  ADD KEY `idx_played_at` (`played_at`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_transaction_id` (`transaction_id`);

--
-- Índices de tabela `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `premios`
--
ALTER TABLE `premios`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `raspadinhas`
--
ALTER TABLE `raspadinhas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Índices de tabela `raspadinhas_premios`
--
ALTER TABLE `raspadinhas_premios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_card_reward` (`scratch_card_id`,`reward_id`),
  ADD KEY `reward_id` (`reward_id`);

--
-- Índices de tabela `solicitacao_saques`
--
ALTER TABLE `solicitacao_saques`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `transacoes`
--
ALTER TABLE `transacoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `transacoes_afiliados`
--
ALTER TABLE `transacoes_afiliados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `afiliado_id` (`afiliado_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `status` (`status`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `valores_config`
--
ALTER TABLE `valores_config`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `visita_site`
--
ALTER TABLE `visita_site`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `active_sessions`
--
ALTER TABLE `active_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `afiliados`
--
ALTER TABLE `afiliados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `afiliados_config`
--
ALTER TABLE `afiliados_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `bau_config`
--
ALTER TABLE `bau_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `game_history`
--
ALTER TABLE `game_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `lotuspay`
--
ALTER TABLE `lotuspay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `historico_raspadas`
--
ALTER TABLE `historico_raspadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=762;

--
-- AUTO_INCREMENT de tabela `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `premios`
--
ALTER TABLE `premios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de tabela `raspadinhas`
--
ALTER TABLE `raspadinhas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `raspadinhas_premios`
--
ALTER TABLE `raspadinhas_premios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT de tabela `solicitacao_saques`
--
ALTER TABLE `solicitacao_saques`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `transacoes`
--
ALTER TABLE `transacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `transacoes_afiliados`
--
ALTER TABLE `transacoes_afiliados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `valores_config`
--
ALTER TABLE `valores_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `visita_site`
--
ALTER TABLE `visita_site`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `game_history`
--
ALTER TABLE `game_history`
  ADD CONSTRAINT `game_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `raspadinhas_premios`
--
ALTER TABLE `raspadinhas_premios`
  ADD CONSTRAINT `raspadinhas_premios_ibfk_1` FOREIGN KEY (`scratch_card_id`) REFERENCES `raspadinhas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `raspadinhas_premios_ibfk_2` FOREIGN KEY (`reward_id`) REFERENCES `premios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `transacoes_afiliados`
--
ALTER TABLE `transacoes_afiliados`
  ADD CONSTRAINT `transacoes_afiliados_ibfk_1` FOREIGN KEY (`afiliado_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transacoes_afiliados_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
