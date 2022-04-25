<?php
include __DIR__ . '/../vendor/autoload.php';

/**
 * @todo Restructure content directories.
 *       Make the URI the folder path inside of src/content.
 *       Each URI can have multiple files; page.* directory.* code-*.*
 *       Create new render methods; renderPage renderDirectory renderCode[auto-escaped]
 */

class DocumentationSite {
	protected $uri;

	public function __construct() {
		$this->uri = $this->getUri();
	}

	public function getUri() {
		if (!$this->uri) {
			$this->uri = $_SERVER['REQUEST_URI'];
		}
		return $this->uri;
	}

	public function getTrimmedUri() {
		return $this->trimSlashes($this->getUri());
	}

	public function trimSlashes($string) {
		return preg_replace('/^\/|\/$/', '', $string);
	}

	public function firstExistingFile($array) {
		foreach ($array as $item) {
			if (file_exists($item))
				return $item;
		}
	}

	public function renderFile($filePath, $data = []) {
		if (!file_exists($filePath)) {
			return '';
		}
		if (preg_match('/\.php$/', $filePath)) {
			$docs = $this;
			ob_start();
			include $filePath;
			$fileContents = ob_get_contents();
			ob_end_clean();
			return $fileContents;
		}
		else if (preg_match('/\.md/', $filePath)) {
			return $this->renderMarkdown(file_get_contents($filePath));
		}
		else {
			return file_get_contents($filePath);
		}
	}

	public function renderMarkdown($string) {
		$parsedown = new Parsedown();

		//--apply classes for code highlighting
		do {
			$matched = preg_match('#(\`\`\`([\w_-]+)(\[(.*)\])?\n)(.+)(\`\`\`)#ms', $string, $match);
			if ($matched) {
				$code = $codeOrg = $match[0];
				$preClass = $match[4] ? " {$match[4]}": '';
				$code = preg_replace('#' . preg_quote($match[1]) . '#', "<pre class=\"styled-code\"><code class=\"language-{$match[2]}\">", $code, 1);
				if (preg_match('#\n(```)#', $code)) {
					$code = preg_replace('#\n(```)#', '</code></pre>', $code, 1);
				}
				else {
					$code = substr($code, 0, -3);
					$code .= '</code></pre>';
				}
				$string = str_replace($codeOrg, $code, $string);
			}
		} while ($matched);

		return $parsedown->text($string);
	}

	public function renderLinkedHeader($text, $id, $options = []) {
		$options = array_merge([
			'title' => 'Copy Permalink',
			'tag' => 'h2'
		], $options);
		return "<{$options['tag']} id=\"{$id}\"><a href=\"#{$id}\" class=\"permalink\" title=\"{$options['title']}\"><i class=\"fas fa-link fa-sm\"></i></a> {$text}</{$options['tag']}>";
	}

	public function getPageContent($route, $data = []) {
		$route = $this->trimSlashes($route);
		$fileName = $route == '' ? 'home' : $route;
		return $this->renderFile($this->firstExistingFile([
			__DIR__ . "/page/{$fileName}.php",
			__DIR__ . "/page/{$fileName}.md",
			__DIR__ . "/page/{$fileName}.html"
		]), $data);
	}

	public function getPageDirectory($route, $data = []) {
		$route = $this->trimSlashes($route);
		$fileName = $route == '' ? 'home' : $route;
		return $this->renderFile($this->firstExistingFile([
			__DIR__ . "/directory/{$fileName}.php",
			__DIR__ . "/directory/{$fileName}.md",
			__DIR__ . "/directory/{$fileName}.html"
		]), $data);
	}

	public function getCurrentPageContent($data = []) {
		return $this->getPageContent($this->getUri(), $data);
	}

	public function getCurrentPageDirectory($data = []) {
		return $this->getPageDirectory($this->getUri(), $data);
	}
}

$docs = new DocumentationSite();
