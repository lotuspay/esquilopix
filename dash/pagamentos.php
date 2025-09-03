<?php
// Inicia buffer de saída para prevenir erros de headers
ob_start();

// Inicia sessão se ainda não estiver ativa
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Inclui o banco
include_once "services/database.php";

$mensagem = "";
$classeMsg = "";

// Buscar token atual
$tokenAtual = "";
$result = $mysqli->query("SELECT token_secreto FROM Lotuspay WHERE id = 1 LIMIT 1");
if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $tokenAtual = $row['token_secreto'];
}

// Salvar novo token
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['Lotuspay_token'])) {
    $novoToken = trim($_POST['Lotuspay_token']);

    if (!empty($novoToken)) {
        $stmt = $mysqli->prepare("UPDATE Lotuspay SET token_secreto = ? WHERE id = 1");
        $stmt->bind_param("s", $novoToken);

        if ($stmt->execute()) {
            $mensagem = "✅ Token atualizado com sucesso!";
            $classeMsg = "success";
            $tokenAtual = $novoToken;
        } else {
            $mensagem = "❌ Erro ao atualizar: " . $stmt->error;
            $classeMsg = "error";
        }

        $stmt->close();
    } else {
        $mensagem = "⚠️ O token não pode estar vazio.";
        $classeMsg = "warning";
    }
}

// Limpa buffer no final
ob_end_flush();
?>

<!DOCTYPE html>
<html x-data="main" class="" :class="[$store.app.mode]">

<?php include "partes/head.php"; ?>

<body x-data="main"
    class="antialiased relative font-inter bg-white dark:bg-black text-black dark:text-white text-sm font-normal overflow-x-hidden vertical"
    :class="[ $store.app.sidebar ? 'toggle-sidebar' : '', $store.app.rightsidebar ? 'right-sidebar' : '', $store.app.menu, $store.app.layout]">

    <!-- Overlays -->
    <div x-cloak class="fixed inset-0 bg-[black]/60 z-40 lg:hidden" :class="{'hidden' : !$store.app.sidebar}" @click="$store.app.toggleSidebar()"></div>
    <div x-cloak class="fixed inset-0 bg-[black]/60 z-50 2xl:hidden" :class="{'hidden' : !$store.app.rightsidebar}" @click="$store.app.rightSidebar()"></div>

    <!-- Container principal -->
    <div class="main-container navbar-sticky flex" :class="[$store.app.navbar]">
        
        <!-- Sidebar -->
        <nav class="sidebar fixed top-0 bottom-0 z-40 flex-none w-[212px] border-r border-black/10 dark:border-white/10 transition-all duration-300">
            <div class="bg-white dark:bg-black h-full">
                <?php include 'partes/menu-lateral.php'; ?>
            </div>
        </nav>

        <!-- Área de conteúdo -->
        <div class="main-content flex-1">
            <!-- Topbar -->
            <?php include 'partes/topbar.php'; ?>

            <!-- Conteúdo -->
            <div class="h-[calc(100vh-73px)] overflow-y-auto overflow-x-hidden">
                <div class="p-4 sm:p-7 min-h-[calc(100vh-145px)]">
                    
                    <!-- Formulário Lotuspay -->
                    <form id="form-gateway-config" method="post" class="space-y-7">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-7">
                            <div class="border border-black/10 dark:border-white/10 p-5 rounded-md">
                                <div class="mb-5">
                                    <p class="text-sm font-semibold">Lotuspay</p>
                                    <h2 class="text-xs italic">Informe o token secreto da sua conta.</h2>
                                </div>

                                <div class="mb-3">
                                    <label class="text-xs font-semibold">Token Secreto</label>
                                    <input name="Lotuspay_token" 
                                        class="form-input w-full border border-black/10 dark:border-white/10 bg-transparent px-3 py-2.5 rounded-lg" 
                                        placeholder="Insira seu token secreto" 
                                        type="text" 
                                        value="<?php echo htmlspecialchars($tokenAtual); ?>" />
                                </div>

                                <div class="mt-3">
                                    <a href="https://Lotuspay.digital/" target="_blank" 
                                    class="text-blue-600 dark:text-blue-400 text-xs underline">
                                        Clique aqui para criar sua conta Lotuspay
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-center mt-8">
                            <button type="submit"
                                class="btn inline-flex items-center px-9 py-2 text-base font-medium rounded-lg bg-lightgreen-100 dark:bg-lightblue-100 align-middle text-black dark:text-black hover:bg-lightgreen-200 dark:hover:bg-lightgreen-200 hover:text-black dark:hover:text-black">
                                <svg class="w-5 h-5 mr-2" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4 27.08S10.96 26.9 9.61 26.88c0 0-1.16-.01-1.73-.12 0 0-1.12-.2-1.78-.87 0 0-.67-.67-.87-1.81 0 0-.1-.58 0-1.75 0 0-.02-1.33-.19-1.74 0 0-.17-.42-1.12-1.4 0 0-.81-.85-1.14-1.33 0 0-.65-.95-.65-1.87 0 0 0-.92.64-1.85 0 0 .33-.47 1.13-1.31 0 0 .96-1 1.14-1.44 0 0 .18-.43.2-1.79 0 0 .02-1.16.12-1.73 0 0 .2-1.12.87-1.78 0 0 .67-.67 1.81-.88 0 0 .58-.11 1.75-.12 0 0 1.33-.02 1.74-.19 0 0 .42-.17 1.4-1.12 0 0 .85-.81 1.33-1.14 0 0 .95-.65 1.87-.65 0 0 .92 0 1.85.64 0 0 .47.33 1.31 1.13 0 0 1 .96 1.44 1.14 0 0 .43.18 1.79.2 0 0 1.16.02 1.73.12 0 0 1.12.2 1.78.87 0 0 .67.67.88 1.81 0 0 .11.58.12 1.75 0 0 .02 1.33.19 1.74 0 0 .1.24.27.42.19.2.45.31.72.31.27 0 .53-.11.72-.31C30 15.08 30 16 30 16s0 .92-.64 1.85c0 0-.33.47-1.13 1.31 0 0-.96 1-1.14 1.44 0 0-.18.43-.2 1.79 0 0-.02 1.16-.12 1.73 0 0-.2 1.12-.87 1.78 0 0-.67.67-1.81.88 0 0-.58.11-1.75.12 0 0-1.33.02-1.74.19 0 0-.42.17-1.4 1.12 0 0-.85.81-1.33 1.14 0 0-.95.65-1.87.65 0 0-.92 0-1.85-.64 0 0-.47-.33-1.31-1.13 0 0-1-.96-1.44-1.14 0 0-.43-.18-1.79-.2 0 0-1.16-.02-1.73-.12 0 0-1.12-.2-1.78-.87z" fill="currentColor"></path>
                                </svg>
                                <span>Salvar Alterações</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Right Sidebar -->
        <?php include 'partes/notificacao.php'; ?>
    </div>

    <?php include 'partes/footer.php'; ?>

    <div id="toast-area" class="fixed bottom-10 right-10 z-[999999] flex flex-col items-end gap-2 pointer-events-auto drop-shadow-2xl"></div>
    <script src="assets/js/toast.js"></script>

    <?php if (!empty($mensagem)): ?>
        <script>
            window.addEventListener("DOMContentLoaded", () => {
                window.createToast("<?php echo $classeMsg; ?>", "<?php echo $mensagem; ?>");
            });
        </script>
    <?php endif; ?>
</body>
</html>
