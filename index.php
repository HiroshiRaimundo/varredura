
<?php
/**
 * Frontend Redirector for React App
 * 
 * Este arquivo serve como ponto de entrada para servidores PHP,
 * redirecionando o tráfego para o aplicativo React.
 */

// Verificar se estamos acessando o arquivo diretamente
if (php_sapi_name() !== 'cli') {
    // Definir cabeçalhos adequados
    header('Content-Type: text/html; charset=utf-8');
    
    // Caminho do arquivo index.html
    $indexFile = '';
    
    // Verificar se o arquivo index.html existe
    if (file_exists(__DIR__ . '/index.html')) {
        // Redirecionar para o aplicativo React
        $indexFile = __DIR__ . '/index.html';
    } else if (file_exists(__DIR__ . '/dist/index.html')) {
        // Alternativa: arquivo no diretório dist (após build)
        $indexFile = __DIR__ . '/dist/index.html';
    }
    
    if (!empty($indexFile)) {
        // Debug: imprimir informações antes de servir o arquivo
        // Para debugging, remova o comentário abaixo
        // error_log("Servindo arquivo: " . $indexFile);
        
        // Ler e servir o arquivo
        $content = file_get_contents($indexFile);
        
        // Verifica se o conteúdo foi lido corretamente
        if ($content !== false) {
            echo $content;
        } else {
            http_response_code(500);
            echo '<h1>Erro ao ler o arquivo</h1>';
            echo '<p>Não foi possível ler o arquivo index.html. Verifique as permissões de arquivo.</p>';
        }
    } else {
        // Erro se não encontrar o arquivo
        http_response_code(500);
        echo '<h1>Erro na configuração</h1>';
        echo '<p>Arquivo index.html não encontrado. Verifique se o build foi concluído corretamente.</p>';
        echo '<p>Diretório atual: ' . __DIR__ . '</p>';
        
        // Listar arquivos do diretório atual para debug
        echo '<p>Arquivos no diretório:</p><pre>';
        print_r(scandir(__DIR__));
        echo '</pre>';
    }
    exit;
}
?>
