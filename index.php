
<?php
/**
 * Frontend Redirector for React App
 * 
 * Este arquivo serve como ponto de entrada para servidores PHP,
 * redirecionando o tráfego para o aplicativo React.
 */

// Ativar exibição de erros para debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Log de erros
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_log("Iniciando carregamento da aplicação React: " . date('Y-m-d H:i:s'));

// Verificar se estamos acessando o arquivo diretamente
if (php_sapi_name() !== 'cli') {
    // Definir cabeçalhos adequados
    header('Content-Type: text/html; charset=utf-8');
    
    // Debug info - ambiente
    error_log("SERVER_SOFTWARE: " . $_SERVER['SERVER_SOFTWARE']);
    error_log("DOCUMENT_ROOT: " . $_SERVER['DOCUMENT_ROOT']);
    error_log("SCRIPT_FILENAME: " . $_SERVER['SCRIPT_FILENAME']);
    error_log("REQUEST_URI: " . $_SERVER['REQUEST_URI']);
    
    // Caminho do arquivo index.html
    $indexFile = '';
    $baseDir = __DIR__;
    
    // Verificar se o arquivo index.html existe
    if (file_exists($baseDir . '/index.html')) {
        $indexFile = $baseDir . '/index.html';
        error_log("Arquivo encontrado: index.html na raiz");
    } else if (file_exists($baseDir . '/dist/index.html')) {
        $indexFile = $baseDir . '/dist/index.html';
        error_log("Arquivo encontrado: index.html em dist/");
    } else {
        // Tentar encontrar em outras pastas comuns
        $possiblePaths = [
            '/public/index.html', 
            '/build/index.html', 
            '/www/index.html',
            '/dist/index.html'
        ];
        
        error_log("Procurando index.html em pastas alternativas...");
        foreach ($possiblePaths as $path) {
            error_log("Verificando: " . $baseDir . $path);
            if (file_exists($baseDir . $path)) {
                $indexFile = $baseDir . $path;
                error_log("Arquivo encontrado: " . $path);
                break;
            }
        }
    }
    
    if (!empty($indexFile)) {
        error_log("Tentando servir arquivo: " . $indexFile);
        
        // Verificar se o arquivo pode ser lido
        if (is_readable($indexFile)) {
            // Ler e servir o arquivo
            $content = file_get_contents($indexFile);
            
            // Verifica se o conteúdo foi lido corretamente
            if ($content !== false) {
                // Verificar se os arquivos JS/CSS estão sendo carregados corretamente
                if (strpos($content, '<script') === false) {
                    error_log("AVISO: Não encontradas tags <script> no HTML");
                }
                
                // Verificar se há links para assets e se os caminhos estão corretos
                if (preg_match_all('/(src|href)="([^"]+)"/i', $content, $matches)) {
                    foreach ($matches[2] as $asset) {
                        if (strpos($asset, 'http') !== 0 && strpos($asset, '//') !== 0) {
                            // É um caminho relativo
                            $assetPath = rtrim($baseDir, '/') . '/' . ltrim($asset, '/');
                            if (!file_exists($assetPath)) {
                                error_log("AVISO: Asset não encontrado: " . $assetPath);
                            }
                        }
                    }
                }
                
                // Servir o conteúdo
                echo $content;
                error_log("Arquivo servido com sucesso");
            } else {
                http_response_code(500);
                error_log("Erro: Conteúdo não pôde ser lido de " . $indexFile);
                echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Erro no Carregamento</title></head><body>';
                echo '<h1>Erro ao ler o arquivo</h1>';
                echo '<p>Não foi possível ler o conteúdo do arquivo index.html. Verifique os logs para mais detalhes.</p>';
                echo '<p>Verifique se o build foi feito corretamente e se os arquivos foram transferidos para o servidor.</p>';
                
                // Informações de debug
                echo '<h2>Informações de Debug:</h2>';
                echo '<pre>';
                echo 'PHP Version: ' . phpversion() . "\n";
                echo 'Server Software: ' . $_SERVER['SERVER_SOFTWARE'] . "\n";
                echo 'Document Root: ' . $_SERVER['DOCUMENT_ROOT'] . "\n";
                echo 'Script Path: ' . $_SERVER['SCRIPT_FILENAME'] . "\n";
                echo 'Current Directory: ' . getcwd() . "\n";
                echo 'Base Directory: ' . $baseDir . "\n";
                echo 'Index File Path: ' . $indexFile . "\n";
                echo '</pre>';
                echo '</body></html>';
            }
        } else {
            http_response_code(500);
            error_log("Erro: Arquivo não tem permissão de leitura: " . $indexFile);
            echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Erro de Permissão</title></head><body>';
            echo '<h1>Erro de permissão</h1>';
            echo '<p>O arquivo index.html foi encontrado, mas não pode ser lido devido a permissões. Verifique as permissões do arquivo.</p>';
            echo '<p>Caminho do arquivo: ' . $indexFile . '</p>';
            if (file_exists($indexFile)) {
                echo '<p>Permissões atuais: ' . substr(sprintf('%o', fileperms($indexFile)), -4) . '</p>';
                echo '<p>Proprietário: ' . posix_getpwuid(fileowner($indexFile))['name'] . '</p>';
                echo '<p>Grupo: ' . posix_getgrgid(filegroup($indexFile))['name'] . '</p>';
            }
            echo '</body></html>';
        }
    } else {
        // Erro se não encontrar o arquivo
        http_response_code(500);
        error_log("Erro: Arquivo index.html não encontrado em nenhum local padrão");
        echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Erro na Configuração</title></head><body>';
        echo '<h1>Erro na configuração</h1>';
        echo '<p>Arquivo index.html não encontrado. Verifique se o build foi concluído corretamente.</p>';
        echo '<p>Diretório atual: ' . $baseDir . '</p>';
        
        // Listar arquivos do diretório atual para debug
        echo '<h2>Arquivos no diretório raiz:</h2><pre>';
        print_r(scandir($baseDir));
        echo '</pre>';
        
        // Se existir o diretório dist, mostrar seu conteúdo também
        if (is_dir($baseDir . '/dist')) {
            echo '<h2>Arquivos no diretório dist:</h2><pre>';
            print_r(scandir($baseDir . '/dist'));
            echo '</pre>';
        }
        
        // Informações adicionais de debug
        echo '<h2>Informações do ambiente:</h2>';
        echo '<pre>';
        echo 'PHP Version: ' . phpversion() . "\n";
        echo 'Server Software: ' . $_SERVER['SERVER_SOFTWARE'] . "\n";
        echo 'Document Root: ' . $_SERVER['DOCUMENT_ROOT'] . "\n";
        echo 'Script Path: ' . $_SERVER['SCRIPT_FILENAME'] . "\n";
        echo 'Request URI: ' . $_SERVER['REQUEST_URI'] . "\n";
        echo '</pre>';
        echo '</body></html>';
    }
    exit;
}
?>
