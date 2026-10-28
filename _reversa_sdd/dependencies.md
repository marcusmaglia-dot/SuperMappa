# Dependências do Sistema — mAPPa

> **Gerado pelo Scout (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente do binário compilado e avisos de licença)

---

## 1. Plataforma e Runtimes

| Componente | Versão / Especificação | Fonte |
|------------|------------------------|-------|
| **Linguagem Principal** | Dart 3.x | `libapp.so` |
| **Framework Mobile** | Flutter 3.x | `libflutter.so` / `AssetManifest.bin` |
| **Plataforma Nativa** | Android SDK | `manifest.json` / `AndroidManifest.xml` |
| **Min SDK Android** | `24` (Android 7.0) | `manifest.json` |
| **Target SDK Android** | `36` | `manifest.json` |
| **Arquitetura Alvo** | ARM64-v8a | `config.arm64_v8a.apk` |

---

## 2. Bibliotecas Dart / Flutter Identificadas

### 2.1. Arquitetura, Estado e Navegação
- **`get` (GetX):** Gerenciamento de estado reativo, injeção de dependências (`AplicationBinding`, `ApprenticesBinding`) e sistema de rotas desacoplado (`GetPage`, `GetView`).
- **`dartz`:** Programação funcional em Dart (tratamento de erros com tipos `Either<Failure, Success>`, `Option`).
- **`rxdart`:** Extensões de Streams reativos para fluxos assíncronos de dados.

### 2.2. Rede e Integração HTTP
- **`dio`:** Cliente HTTP robusto utilizado para todas as chamadas às APIs do Paxtu (`paxtu100.escoteiros.org.br`). Suporta interceptors, timeouts e serialização JSON.
- **`cookie_jar`:** Gerenciamento e persistência de cookies de sessão para manutenção de estado autenticado.
- **`http`:** Pacote de rede padrão utilizado como dependência auxiliar.

### 2.3. Persistência Local e Cache
- **`sqflite` / `sqlite`:** Driver de banco de dados SQLite nativo para armazenamento e cache local de dados no dispositivo móvel.
- **`cached_network_image` / `flutter_cache_manager`:** Cacheamento de imagens remotas (fotos de perfil, distintivos de especialidades e insígnias hospedadas no AWS S3).
- **`octo_image`:** Utilitário para renderização fluida e placeholders de imagens em rede.

### 2.4. Recursos do Dispositivo e Multimídia
- **`camera` / `camera_android_camerax`:** Integração com as câmeras do aparelho via CameraX para fotos de atividades e perfil.
- **`image_picker`:** Seleção de imagens da galeria ou captura direta.
- **`open_filex`:** Abertura de anexos, documentos PDF e diretrizes escoteiras.
- **`permission_handler`:** Gerenciamento em tempo de execução das permissões Android (Câmera, Armazenamento, Microfone).

### 2.5. UI, Tipografia e Ícones
- **`font_awesome_flutter`:** Ícones vetoriais da família FontAwesome Brands, Regular e Solid.
- **`cupertino_icons`:** Ícones de estilo iOS integrados.
- **`flutter_svg` / `jovial_svg`:** Renderização de vetores SVG de distintivos e símbolos da UEB.
- **`material_color_utilities`:** Utilitários de paleta de cores e temas Material Design.

### 2.6. Utilitários e Formatação
- **`intl`:** Formatação de datas em padrão brasileiro (`dd/MM/yyyy`), números e suporte à localização.
- **`uuid`:** Geração de identificadores únicos para registros locais.
- **`archive` / `convert` / `crypto`:** Compressão, serialização e hashing de dados.

---

## 3. Bibliotecas Nativas Android (.so)

Presentes em `config.arm64_v8a.apk` (`lib/arm64-v8a/`):
- `libflutter.so`: Runtime da engine Flutter (Skia/Impeller, Dart VM).
- `libapp.so`: Código Dart da aplicação compilado em código de máquina (AOT).
- `libdatastore_shared_counter.so`: Suporte ao Jetpack DataStore nativo.
- `libimage_processing_util_jni.so`: Processamento nativo de imagens via JNI.
- `libsurface_util_jni.so`: Utilitários de renderização de superfície.
