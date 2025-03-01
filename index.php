
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
    
    // Verificar se o arquivo index.html existe
    if (file_exists(__DIR__ . '/index.html')) {
        // Redirecionar para o aplicativo React
        readfile(__DIR__ . '/index.html');
    } else if (file_exists(__DIR__ . '/dist/index.html')) {
        // Alternativa: arquivo no diretório dist (após build)
        readfile(__DIR__ . '/dist/index.html');
    } else {
        // Erro se não encontrar o arquivo
        http_response_code(500);
        echo '<h1>Erro na configuração</h1>';
        echo '<p>Arquivo index.html não encontrado. Verifique se o build foi concluído corretamente.</p>';
    }
    exit;
}
?>
