// Static markup of the ClassQuest case study V2. Generated from the approved artifact, author controlled
// (no user input), rendered once by ClassQuestV2.tsx. Interactions are attached by runtime.ts.
export const CLASSQUEST_V2_HTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="gA" x1="31.4873" y1="0" x2="4.05693" y2="28.8085" gradientUnits="userSpaceOnUse"><stop stop-color="#3C83F6"/><stop offset="1" stop-color="#212834"/></linearGradient>
    <linearGradient id="gB" x1="22.3317" y1="15.0244" x2="8.30108" y2="32.1578" gradientUnits="userSpaceOnUse"><stop stop-color="#3C83F6"/><stop offset="1" stop-color="#212834"/></linearGradient>
    <symbol id="capsym" viewBox="0 0 31.5 28">
      <path fill="url(#gA)" d="M30.2034 7.36864L16.8319 0.276775C16.1373 -0.0922585 15.3136 -0.0922585 14.619 0.276775L1.24748 7.36864C0.477126 7.76996 0 8.57262 0 9.43983C0 10.3182 0.477089 11.1097 1.24748 11.5222L3.32989 12.6279L5.42351 13.7337L14.6205 18.603C15.3052 18.9637 16.1429 18.9693 16.8221 18.603L22.2989 15.7081V14.5154C22.2989 14.5154 16.5682 11.1757 15.1844 10.3732C13.9636 9.65888 15.0314 7.79961 16.269 8.50825L23.9249 12.9551C24.5199 13.2358 24.4876 14.002 24.4666 14.5605C24.4708 15.9524 24.4638 18.9315 24.4666 20.3404C24.4525 21.0813 24.4764 23.1104 24.4666 23.8316C24.489 25.2489 26.6092 25.2616 26.6359 23.8316V21.8573C27.579 21.5107 28.1978 20.6099 28.1978 19.5798V15.0249L26.6359 15.8598C26.6359 15.8598 26.6247 13.4953 26.6149 13.4196C27.4835 12.9691 29.3288 11.9855 30.2043 11.5224C31.8378 10.7212 31.8504 8.16587 30.2043 7.36903L30.2034 7.36864Z"/>
      <path fill="url(#gB)" d="M15.7248 21.0427C14.9868 21.0427 14.2613 20.8688 13.6102 20.5222L5.42234 16.1848L3.25293 15.0244V19.5794C3.25293 20.6641 3.93629 21.607 4.94521 21.9116C6.71329 22.4869 11.1264 24.1455 13.9036 27.1933C14.8186 28.2653 16.6245 28.2681 17.5365 27.2045C18.9467 25.6652 20.7358 24.5047 22.2976 23.6796C22.3033 22.3381 22.2934 19.5147 22.2976 18.1594L17.8411 20.5238C17.19 20.8703 16.4632 21.0444 15.7264 21.0444L15.7248 21.0427Z"/>
    </symbol>
  </defs>
</svg>
<div class="cs">

          <!-- HERO -->
          <header class="hero">
            <div class="c">
              <div class="dashey">Master's thesis case study · Human Computer Interaction</div>
              <h1>Turning scattered class notes into a <em>shared quest</em> for knowledge</h1>
              <p class="lede">An AI class wiki that turns shared notes into cited flashcards, quizzes and a daily quest.</p>
              <dl class="facts">
                <div><dt class="kick">Role</dt><dd><b>UX Researcher & Designer</b></dd></div>
                <div><dt class="kick">Duration</dt><dd><b>3 phase DSR study</b></dd></div>
                <div><dt class="kick">Methodology</dt><dd><b>Design Science Research</b></dd></div>
                <div><dt class="kick">Tools</dt><dd><b>Figma · Lovable AI · Hotjar</b></dd></div>
              </dl>
              <div class="hf" id="hf"><img id="hfi" src="/images/classquest/v2/hero.jpg" width="2000" height="2804" alt="The ClassQuest landing page, scrolling inside its frame"></div>
            </div>
          </header>

          <!-- OUTCOMES -->
          <section class="sec" id="outcomes" style="padding-top:24px">
            <div class="c">
              <div class="oc">
                <div class="o"><span class="num"><span data-to="8.14" data-dec="2">8.14</span><small>/10</small></span><p>mean rating from the same 7 students</p></div>
                <div class="o"><span class="num"><span data-to="7">7</span><small>/7</small></span><p>called the redesign a clear improvement</p></div>
                <div class="o"><span class="num"><span data-to="0">0</span></span><p>rage clicks across 156 recorded clicks</p></div>
                <div class="o"><span class="num"><span data-to="15">15</span></span><p>design guidelines for AI class wikis</p></div>
              </div>
              <div class="pa">
                <div><span class="kick">The problem</span><p>Class notes sit in WhatsApp, Drive and ChatGPT, and nobody can check the sources.</p></div>
                <div><span class="kick" style="color:var(--blue)">The answer</span><p>One shared class wiki that turns notes into cited flashcards, quizzes and a daily quest.</p></div>
              </div>
            </div>
          </section>

          <!-- PROBLEM -->
          <section class="sec alt" id="problem">
            <div class="c">
              <div class="pinw" id="pinw"><div class="pins">
<div class="sh">
                <div class="eb"><i>01</i>Context & problem</div>
                <h2>Every student's study system is a graveyard of tabs</h2>
                <p class="lede">This is an <b>infrastructure problem</b>, not a willingness problem. Students share constantly, with no tool built for it.</p>
              </div>

              <div class="cv" id="cv" aria-label="Five scattered tools merge into one ClassQuest space">
                <div class="tool" style="left:3%;top:6%;--r:-4deg"><div class="in" data-d="14"><span class="ic"><svg aria-hidden="true" width="20" height="20" fill="#25D366" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></span><span>WhatsApp group<small>handwritten notes, photos</small></span></div></div>
                <div class="tool" style="left:46%;top:0;--r:3deg"><div class="in" data-d="24"><span class="ic"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 87.3 78"><path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/><path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z" fill="#00ac47"/><path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/><path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/><path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/><path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/></svg></span><span>Shared Drive folder<small>"Notes FINAL (3)"</small></span></div></div>
                <div class="tool" style="left:62%;top:46%;--r:-3deg"><div class="in" data-d="18"><span class="ic"><svg aria-hidden="true" width="20" height="20" fill="#F98012" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.3726 0 0 5.3726 0 12s5.3726 12 12 12 12-5.3726 12-12S18.6274 0 12 0Zm1.1348 5.7402.0351.123-2.7363 1.9903c.3694.2606.7968.609 1.0078.8438l.0762.1035c-1.2878 2.2571-3.737 3.0557-6.3164 2.1816l.0195-.1601h-.002c-.0784-.5679-.0962-1.0524-.0585-1.463-.7507-.003-1.5298-.0402-2.2832-.0663l-.5157.0175c-.0994.8449-.0351 2.135-.0254 2.3223.3492 1.2819.2977 2.2907.295 3.5293-.4134-1.0028-.8995-2.097-.416-3.4668l-.0098-.3183c-.0007-.0143-.0683-1.1532.037-2.0625l-.4081.0136-.0371-.1191C5.7922 6.8402 8.5032 6.218 13.1348 5.7402Zm1.623 2.5137c1.2202 0 2.1885.2691 2.9043.8066.8138.601 1.2207 1.4866 1.2207 2.6582v5.6856h-2.7344v-5.3691c0-1.1225-.4634-1.6836-1.3906-1.6836-.9278 0-1.3906.561-1.3906 1.6836v5.3691h-2.7344v-5.3691c0-.5183-.0986-.9144-.293-1.1934.6172-.435 1.1534-1.0124 1.5723-1.7246.0297.029.0597.0574.0879.0879.5044-.6349 1.4233-.9512 2.7578-.9512zm-9.6094 3.2344c.932.3 1.8614.393 2.7364.287a3.5455 3.5455 0 0 0-.0098.2599v5.3691H5.1426v-5.6855c0-.0787.0022-.1544.0058-.2305z"/></svg></span><span>Moodle and ILIAS<small>lecture slides</small></span></div></div>
                <div class="tool" style="left:8%;top:52%;--r:2.5deg"><div class="in" data-d="28"><span class="ic"><svg aria-hidden="true" width="20" height="20" fill="#10A37F" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg></span><span>ChatGPT summary<small>no source trail</small></span></div></div>
                <div class="tool" style="left:34%;top:80%;--r:-2deg"><div class="in" data-d="20"><span class="ic"><svg aria-hidden="true" width="20" height="20" fill="#26A5E4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></span><span>Telegram channel<small>"who has week 4?"</small></span></div></div>
                <div class="lockc"><svg class="capw" aria-hidden="true"><use href="#capsym"/></svg><b>ClassQuest</b><span>One course space, every source cited</span></div>
                <div class="cvcap" aria-hidden="true"><span class="a">Scroll to merge: <b id="cvn" style="font-weight:400">0 of 5 merged</b></span><span class="b">One place</span></div>
              </div>
</div></div>

              <div class="stats">
                <div class="st"><span class="num"><span data-to="11">11</span>/18</span><div class="pb"><i style="--v:61.1%"></i></div><p>use WhatsApp or Telegram as their main notes channel</p></div>
                <div class="st"><span class="num"><span data-to="18">18</span>/18</span><div class="pb"><i style="--v:100%"></i></div><p>used AI to summarize notes. None fully trusted it.</p></div>
                <div class="st"><span class="num">0</span><div class="pb"></div><p>tools combine sharing, AI, practice and citations</p></div>
              </div>

              <div class="mx">
                <table>
                  <thead><tr><th>Tool</th><th>Share notes</th><th>AI transform</th><th>Retrieval practice</th><th>Source citations</th></tr></thead>
                  <tbody>
                    <tr><td>Anki, Quizlet</td><td class="n">&ndash;</td><td class="n">&ndash;</td><td class="y">&check;</td><td class="n">&ndash;</td></tr>
                    <tr><td>ChatGPT</td><td class="n">&ndash;</td><td class="y">&check;</td><td class="n">&ndash;</td><td class="n">&ndash;</td></tr>
                    <tr><td>Notion AI</td><td class="n">&ndash;</td><td class="y">&check;</td><td class="n">&ndash;</td><td class="n">&ndash;</td></tr>
                    <tr class="us"><td>ClassQuest</td><td class="y">&check;</td><td class="y">&check;</td><td class="y">&check;</td><td class="y">&check;</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- METHOD -->
          <section class="sec" id="method">
            <div class="c">
              <div class="sh">
                <div class="eb"><i>02</i>Methodology</div>
                <h2>Build, evaluate, learn, rebuild</h2>
                <p class="lede">Every decision in the final prototype traces back to a finding from the phase before it.</p>
              </div>

              <svg class="lanes" id="lanes" viewBox="0 0 1000 356" role="img" aria-label="18 survey respondents narrow to 7 students who join both testing phases">
                <rect x="470" y="28" width="255" height="300" rx="14" fill="#e6ecfd" opacity=".7"/>
                <rect x="725" y="28" width="255" height="300" rx="14" fill="#e6ecfd" opacity=".35"/>
                <g fill="#161a2b">
                  <text class="m" x="20" y="22" font-size="11" letter-spacing="1" fill="#d9971f">PHASE 1</text>
                  <text x="20" y="46" font-size="22" font-weight="700">Problem grounding</text>
                  <text x="20" y="68" font-size="13" fill="#4b4f66">Anonymous survey, Google Forms</text>
                  <text class="m" x="486" y="22" font-size="11" letter-spacing="1" fill="#d9971f">PHASE 2</text>
                  <text x="486" y="52" font-size="22" font-weight="700">Mid fidelity</text>
                  <text x="486" y="74" font-size="13" fill="#4b4f66">Task tests and interviews</text>
                  <text class="m" x="741" y="22" font-size="11" letter-spacing="1" fill="#d9971f">PHASE 3</text>
                  <text x="741" y="52" font-size="22" font-weight="700">High fidelity</text>
                  <text x="741" y="74" font-size="13" fill="#4b4f66">Tests, survey and Hotjar</text>
                </g>
                <rect x="20" y="100" width="190" height="228" rx="14" fill="#161a2b"/>
                <text x="115" y="196" text-anchor="middle" font-size="64" font-weight="700" fill="#fff" letter-spacing="-3">18</text>
                <text class="m" x="115" y="226" text-anchor="middle" font-size="11" letter-spacing="1" fill="#aab0c8">RESPONDENTS</text>
                <g id="fun"></g><g id="ln"></g>
                <text x="760" y="348" text-anchor="middle" font-size="14" font-weight="700" fill="#2f5fe0">The same 7 students, twice</text>
              </svg>
              <div class="mob" aria-hidden="false">
                <div class="mrow"><span class="kick">Phase 1</span><div class="bx g" style="width:100%">18 respondents</div></div>
                <div class="mrow"><span class="kick">Phase 2</span><div class="bx" style="width:39%;min-width:92px">7 students</div></div>
                <div class="mrow"><span class="kick">Phase 3</span><div class="bx" style="width:39%;min-width:92px">same 7</div></div>
              </div>
              <p class="same">The same seven students came back, so every change gets a before and after read from the same people.</p>
            </div>
          </section>

          <!-- RESEARCH -->
          <section class="sec alt" id="research">
            <div class="c">
              <div class="rs">
                <div class="sh">
                  <div class="eb"><i>03</i>Phase 1 · Research</div>
                  <h2>The problem is structural, not motivational</h2>
                  <p class="lede">I surveyed 18 students. Four patterns set the direction.</p>
                </div>
                <div>
                  <article class="pat"><span class="kick">Pattern 1</span><h3>AI is in the workflow and already distrusted</h3>
                    <div class="bars"><div class="br"><span>Used AI</span><div class="pb"><i style="--v:100%"></i></div><b>18/18</b></div><div class="br"><span>Fully trusted it</span><div class="pb"></div><b>0/18</b></div></div>
                    <p>Cost was the second biggest complaint.</p></article>
                  <article class="pat"><span class="kick">Pattern 2</span><h3>Knowledge lives in channels nobody can search</h3>
                    <div class="bars"><div class="br"><span>WhatsApp, Telegram</span><div class="pb"><i style="--v:61.1%"></i></div><b>11</b></div><div class="br"><span>Moodle, ILIAS</span><div class="pb"><i style="--v:44.4%"></i></div><b>8</b></div><div class="br"><span>Drive, Docs</span><div class="pb"><i style="--v:38.9%"></i></div><b>7</b></div></div>
                    <p>Three students had no shared system at all.</p></article>
                  <article class="pat"><span class="kick">Pattern 3</span><h3>Students want to contribute, with little friction</h3>
                    <div class="bars"><div class="br"><span>Help others</span><div class="pb"><i style="--v:94.4%"></i></div><b>17/18</b></div></div>
                    <p>That is their reason for sharing. Badges do not come up.</p></article>
                  <article class="pat"><span class="kick">Pattern 4</span><h3>Interest is real, and so is skepticism</h3>
                    <div class="bars"><div class="br"><span>Rated 4 or 5</span><div class="pb"><i style="--v:66.7%"></i></div><b>12/18</b></div></div>
                    <p>The design had to prove its value fast.</p></article>
                </div>
              </div>
              <div class="flow">
                <div><b>Contribute</b>Students add material</div>
                <div><b>Curate</b>AI extracts, student confirms</div>
                <div><b>Learn</b>Retrieval first practice</div>
              </div>
            </div>
          </section>

          <!-- TESTING -->
          <section class="sec" id="testing">
            <div class="c">
              <div class="sh">
                <div class="eb"><i>04</i>Phase 2 · Mid fidelity</div>
                <h2>The concept worked. The interface got in its own way.</h2>
                <p class="lede">Seven students tested a mid fidelity prototype. All of them understood the idea. Six usability themes surfaced.</p>
              </div>
              <div class="tgrid">
                <div class="stagew">
                  <div class="stage" id="stage">
                    <div class="ly on" id="lyD"><div class="zm" style="aspect-ratio:2400/2018"><img src="/images/classquest/v2/dash-before.jpg" width="2400" height="2018" alt="Mid fidelity dashboard with the problem spots marked">
                      <span class="pin" data-k="2" style="left:15.7%;top:2.8%">2</span>
                      <span class="pin" data-k="4" style="left:12.4%;top:39.4%">4</span>
                      <span class="pin" data-k="5" style="left:14.8%;top:48%">5</span>
                      <span class="pin" data-k="6" style="left:80%;top:2.8%">6</span></div></div>
                    <div class="ly" id="lyC"><div class="zm" style="aspect-ratio:1800/1356"><img src="/images/classquest/v2/fmt-flashcard.jpg" width="1800" height="1356" alt="Flashcard screen with the Explain and Cite panel marked">
                      <span class="pin" data-k="3" style="left:25.7%;top:62.5%">3</span></div></div>
                  </div>
                </div>
                <div id="finds">
                  <div class="fd on" data-k="1" data-l="D"><span class="ix">1</span><div><h3>The landing page undersold the concept</h3><p>4 of 7 expected a tutorial from "Explore Demo".</p><a class="go" href="#redesign" data-jump="redesign">Fixed in Phase 3 &darr;</a></div></div>
                  <div class="fd" data-k="2" data-l="D" data-x="15.7" data-y="2.8" data-s="2.1"><span class="ix">2</span><div><h3>Upload hid behind "Wiki"</h3><p>4 of 7 could not find where to contribute.</p><span class="tag red">Issue</span></div></div>
                  <div class="fd ok" data-k="3" data-l="C" data-x="25.7" data-y="62.5" data-s="1.5"><span class="ix">3</span><div><h3>"Explain & Cite" was the favorite</h3><p>Praised in every interview.</p><span class="tag green">Praise</span></div></div>
                  <div class="fd" data-k="4" data-l="D" data-x="12.4" data-y="39.4" data-s="1.9"><span class="ix">4</span><div><h3>Weak concepts felt like a dump</h3><p>Students wanted a breakdown by topic.</p><span class="tag red">Issue</span></div></div>
                  <div class="fd" data-k="5" data-l="D" data-x="14.8" data-y="48" data-s="2"><span class="ix">5</span><div><h3>Gamification needed calibration</h3><p>It should tie to something tangible.</p><span class="tag">Tune</span></div></div>
                  <div class="fd" data-k="6" data-l="D" data-x="80" data-y="2.8" data-s="2"><span class="ix">6</span><div><h3>The interface felt heavy for new users</h3><p>Dark mode contrast was also low.</p><span class="tag red">Issue</span></div></div>
                </div>
              </div>
              <blockquote class="pq"><p>"At some points I think the UI is a little bit heavy. It can be a bit more cleaner, a bit more easy to understand."</p><cite>P6, mid fidelity interview</cite></blockquote>
            </div>
          </section>

          <!-- REDESIGN -->
          <section class="sec alt" id="redesign">
            <div class="c">
              <div class="sh">
                <div class="eb"><i>05</i>Phase 3 · High fidelity</div>
                <h2>Twelve changes, each traced to a participant's words</h2>
                <p class="lede">These three mattered most.</p>
              </div>
              <div>
                <div class="chg">
                  <div class="tx"><span class="tag red">Insight</span><p>"Explore Demo" promised a guided tour.</p><span class="tag green">Action</span><p class="a">Now it reads "See How It Works".</p></div>
                  <div class="imgs one"><div class="cpw"><div class="cp" data-src="/images/classquest/v2/hero.jpg" data-iw="1400" data-ih="1962" data-x="20" data-y="230" data-w="700" data-h="400"><span class="tag green">After</span></div></div></div>
                </div>
                <div class="chg">
                  <div class="tx"><span class="tag red">Insight</span><p>4 of 7 could not find upload under "Wiki".</p><span class="tag green">Action</span><p class="a">Sources & Wiki, and Upload Sources on the dashboard.</p></div>
                  <div class="imgs">
                    <div class="cp" data-src="/images/classquest/v2/dash-before.jpg" data-iw="1500" data-ih="1261" data-x="0" data-y="0" data-w="800" data-h="350"><span class="tag red">Before</span></div>
                    <div class="cp" data-src="/images/classquest/v2/dash-after.jpg" data-iw="1176" data-ih="1036" data-x="0" data-y="0" data-w="1176" data-h="515"><span class="tag green">After</span></div>
                  </div>
                </div>
                <div class="chg">
                  <div class="tx"><span class="tag red">Insight</span><p>Horizontal nav and dense panels felt heavy.</p><span class="tag green">Action</span><p class="a">A vertical sidebar, and Exam Ready % in place of raw XP.</p></div>
                  <div class="imgs">
                    <div class="cp" data-src="/images/classquest/v2/dash-before.jpg" data-iw="1500" data-ih="1261" data-x="145" data-y="548" data-w="605" data-h="150"><span class="tag red">Before</span></div>
                    <div class="cpw"><span class="tag green">After</span><div class="cpl" role="img" aria-label="After: Exam Ready 62 percent and 12 days until exam stat cards"><div class="cpl-row"><div class="sc sc1"><span class="si"><svg viewBox="0 0 24 24" fill="none" stroke="#3b7be8" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="2"/></svg></span><span class="st2"><b>62%</b><small>Exam Ready</small></span></div><div class="sc"><span class="si am"><svg viewBox="0 0 24 24" fill="none" stroke="#e0932a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5"/><path d="M8 3.5v4M16 3.5v4M4 10.5h16"/></svg></span><span class="st2"><b>12 days</b><small>Until Exam</small></span></div><div class="sc sc3"><span class="si gr"></span></div></div><div class="cpl-h">Your Topics</div></div></div>
                  </div>
                </div>
              </div>

              <div class="cmpw">
                <h3>The whole dashboard, before and after</h3>
                <div class="cmp" id="cmp">
                  <img src="/images/classquest/v2/dash-before.jpg" width="2400" height="2018" alt="Dashboard before: horizontal navigation and raw XP" loading="lazy">
                  <img class="af" src="/images/classquest/v2/dash-after.jpg" width="1176" height="1036" alt="Dashboard after: vertical sidebar and Exam Ready percent" loading="lazy">
                  <span class="tag red" style="left:12px">Before</span><span class="tag green" style="right:12px">After</span>
                  <div class="hd"></div>
                  <input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after">
                  <div class="cur" id="cur"><svg width="26" height="28" viewBox="0 0 24 26" fill="none" aria-hidden="true" style="margin:-2px 0 0 -4px;transform:scaleX(-1);filter:drop-shadow(0 3px 5px rgba(0,0,0,.28))"><path d="M14.77 21.086 18.949 3.436 3.841 12.588 11.234 14.549Z" fill="#fafafa"/><path d="M18.619 2.874 19.93 2.08 19.573 3.589 15.394 21.239 15.006 22.88 14.206 21.401 10.803 15.111 3.678 13.22 2.191 12.826 3.511 12.026Z" fill="none" stroke="#080808" stroke-width="1.92" stroke-miterlimit="10"/></svg><span>drag me</span></div>
                </div>
              </div>

              <blockquote class="pq" style="margin-top:88px"><p>"Navigation was very intuitive now. Previously I was unable to even find it whereas this time I felt completely in control."</p><cite>R5, high fidelity evaluation</cite></blockquote>
            </div>
          </section>

          <!-- BRAND -->
          <section class="sec" id="brand">
            <div class="c">
              <div class="sh">
                <div class="eb"><i>06</i>Branding & visual identity</div>
                <h2>The symbol students spend four years earning</h2>
                <p class="lede">The <b>graduation cap</b> already means achievement. My job was making it feel modern enough for a midnight study session.</p>
              </div>

              <div class="bp" id="bp">
                <div class="stg"><svg class="capb" id="capb" aria-hidden="true"><use href="#capsym"/></svg></div>
                <div class="tx"><p>A faceted 3D cap with a navy to sky gradient. It looks like it is catching light mid toss.</p><small>Final mark · legible at 16 px and at hero size</small></div>
              </div>

              <div class="bh">
                <h3>Four directions, one kept</h3>
                <div class="dirs">
                  <div class="fl" tabindex="0" role="button" aria-label="Shield or badge, tap for verdict"><div class="fi"><div class="fa"><span class="kick">01</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 2.5v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9v-6L12 3z"/></svg><h4>Shield or badge</h4></div><div class="fb"><b>Dropped</b>It felt like a university seal. Authority, not progress.</div></div></div>
                  <div class="fl" tabindex="0" role="button" aria-label="Stacked flashcards, tap for verdict"><div class="fi"><div class="fa"><span class="kick">02</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="7" width="13" height="10" rx="1.6"/><path d="M4 9v9a1.6 1.6 0 001.6 1.6H16"/></svg><h4>Stacked flashcards</h4></div><div class="fb"><b>Dropped</b>It described one feature, not the destination.</div></div></div>
                  <div class="fl" tabindex="0" role="button" aria-label="Flat cap outline, tap for verdict"><div class="fi"><div class="fa"><span class="kick">03</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9l10-4 10 4-10 4L2 9z"/><path d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4"/><path d="M22 9v5"/></svg><h4>Flat cap outline</h4></div><div class="fb"><b>Dropped</b>Right symbol, wrong form. It read as a placeholder icon.</div></div></div>
                  <div class="fl win" tabindex="0" role="button" aria-label="3D gradient cap, tap for verdict"><div class="fi"><div class="fa"><span class="kick" style="color:var(--blue)">04 · Kept</span><svg aria-hidden="true"><use href="#capsym"/></svg><h4>3D gradient cap</h4></div><div class="fb"><b>Kept</b>Faceted planes give depth and energy, and it stays legible in a 16 px sidebar.</div></div></div>
                </div>
              </div>

              <div class="bh">
                <h3>Lockups</h3>
                <div class="lks">
                  <div class="lk l"><div class="sp"><span class="in"><svg class="capw" aria-hidden="true"><use href="#capsym"/></svg>ClassQuest</span></div><p><b>Light surface</b>Wordmark in deep navy.</p></div>
                  <div class="lk d"><div class="sp"><span class="in"><svg class="capw" aria-hidden="true"><use href="#capsym"/></svg>ClassQuest</span></div><p><b>Dark surface</b>Wordmark flips to white.</p></div>
                  <div class="lk i"><div class="sp"><svg style="width:52px;height:46px" aria-hidden="true"><use href="#capsym"/></svg></div><p><b>Icon only</b>Minimum 24 by 24 px.</p></div>
                </div>
              </div>

              <div class="bh">
                <h3>Color is a signal</h3>
                <div class="sw" id="sw">
                  <button type="button" data-hex="#1B2A6B" style="background:linear-gradient(135deg,#1B2A6B,#6BA3EF);flex-grow:1.4"><b>Graduation gradient</b><code>#1B2A6B to #6BA3EF</code><small>Cap icon only. Never on UI elements.</small></button>
                  <button type="button" data-hex="#13182B" style="background:#13182B"><b>Ink Navy</b><code>#13182B</code><small>Wordmark, headings, body</small></button>
                  <button type="button" data-hex="#2F5FE0" style="background:#2F5FE0"><b>Action Blue</b><code>#2F5FE0</code><small>CTAs, active states, links</small></button>
                  <button type="button" data-hex="#E6ECFD" style="background:#E6ECFD;color:#13182B"><b>Blue Tint</b><code>#E6ECFD</code><small>Selected states, hover fills</small></button>
                  <button type="button" data-hex="#1F8A5C" style="background:#1F8A5C"><b>Mastery Green</b><code>#1F8A5C</code><small>Topic complete, correct</small></button>
                  <button type="button" data-hex="#D9971F" style="background:#D9971F"><b>Review Amber</b><code>#D9971F</code><small>Review due, streak at risk</small></button>
                  <button type="button" data-hex="#C24545" style="background:#C24545"><b>Urgent Red</b><code>#C24545</code><small>Weak concept, wrong answer</small></button>
                </div>
                <p class="kick">Tap a swatch to copy its hex</p>
              </div>

              <div class="bh">
                <h3>Type</h3>
                <div class="tys">
                  <div><div class="kick" style="margin-bottom:12px">Display · 800 · type to try it</div><div class="big" contenteditable="true" spellcheck="false" role="textbox" aria-label="Editable type specimen">Aa Bg 12 Sc</div></div>
                  <div><p class="s" style="font-weight:600">Sources & Wiki</p><p class="m">UI labels · 600</p></div>
                  <div><p class="s">What is Mutual Authentication?</p><p class="m">Body · 400</p></div>
                  <div><span class="cite">Lecture_04_Slides.pdf · Slide 8</span><p class="m">Mono for citations</p></div>
                </div>
              </div>

              <div class="bh">
                <h3>Voice</h3>
                <div class="vcs">
                  <div class="vc"><h4>Plain, never patronising</h4><s>Uh oh, time to catch up!</s><span class="ok">2 weak concepts detected</span></div>
                  <div class="vc"><h4>Verbs, not labels</h4><s>Submit</s><span class="ok">Upload Sources</span></div>
                  <div class="vc"><h4>Numbers earn the praise</h4><s>Great job today!</s><span class="ok">23% better than last week</span></div>
                </div>
              </div>

              <div class="bh" style="margin-top:56px;gap:0">
                <div class="acc"><button type="button" aria-expanded="false">Why faceted and 3D?<i></i></button><div class="pn"><div><p>A flat outline cap reads like a label. Faceted geometry and a directional gradient give it mass and motion, as if it is rotating mid air after the toss, without looking pulled from an icon library.</p></div></div></div>
                <div class="acc"><button type="button" aria-expanded="false">Why ClassQuest stays one word, one weight<i></i></button><div class="pn"><div><p>Splitting "Class" and "Quest" by weight or color makes the name feel like a tagline. One heavy weight at fixed tracking reads as a single destination. The cap supplies all the variation the lockup needs.</p></div></div></div>
                <div class="acc"><button type="button" aria-expanded="false">Why a mono face for citations<i></i></button><div class="pn"><div><p>It is the one exception to the single family rule. Its typewriter feel says a chip points at a real file, not an AI guess.</p></div></div></div>
              </div>
            </div>
          </section>

          <!-- PRODUCT -->
          <section class="sec alt" id="product">
            <div class="c">
              <div class="sh">
                <div class="eb"><i>07</i>Final solution</div>
                <h2>The contribute, curate, learn loop in nine screens</h2>
                <p class="lede">Pick a stage to see the screens that carry it.</p>
              </div>
              <div class="tabs" role="tablist" aria-label="Loop stages">
                <button class="tab" type="button" role="tab" aria-selected="true" data-tab="0"><span class="kick">Stage 1 · 2 screens</span><b>Contribute</b><span>Students add and organize sources</span></button>
                <button class="tab" type="button" role="tab" aria-selected="false" data-tab="1"><span class="kick">Stage 2 · 2 screens</span><b>Curate</b><span>AI assists, students confirm</span></button>
                <button class="tab" type="button" role="tab" aria-selected="false" data-tab="2"><span class="kick">Stage 3 · 6 screens</span><b>Learn</b><span>Practice, review, progress</span></button>
              </div>
              <div class="pst" id="pst"></div>
              <div class="pc"><b id="pt"></b><span id="pcap"></span></div>
              <div class="thumbs" id="thumbs"></div>

              <div class="fcw">
                <div>
                  <span class="kick" style="color:var(--blue)">Interactive demo</span>
                  <h3>Flip it. Rate it. See the source.</h3>
                  <p>This is the core loop of a study session. Every answer opens its citation.</p>
                  <p class="keys"><kbd>Space</kbd> flips the card</p>
                </div>
                <div class="app" id="app">
                  <div class="tp"><span style="font-weight:500">Daily set</span><span class="stk" id="stk">3 to keep streak</span></div>
                  <div class="pg"><i id="pgi"></i></div>
                  <div class="box">
                    <span class="tg">FLASHCARD</span>
                    <button class="fc" id="fc" type="button" aria-label="Flashcard. Press to flip.">
                      <span class="fci"><span class="fcf"><span>What is Mutual Authentication?<small>Tap to flip</small></span></span><span class="fcb"><span>A security process where both parties in a communication verify each other's identity before exchanging data.</span></span></span>
                    </button>
                  </div>
                  <div class="box rate"><p>How well did you know this?</p><div class="bt" id="rt"><button type="button" disabled>I knew this</button><button type="button" disabled>I was unsure</button><button type="button" disabled>I didn't know</button></div><small id="rh">Flip the card first</small></div>
                  <div class="ec" id="ec"><div><div class="box"><h4><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f5fe0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 5.5C4.5 4 8 4 12 6c4-2 7.500-2 10-.5v13c-2.500-1.500-6-1.500-10 .5-4-2-7.500-2-10-.5z"/><path d="M12 6v13"/></svg>Explain & Cite</h4><p>Mutual authentication ensures that both the client and server prove their identities, preventing man in the middle attacks.</p><span class="chip2"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg><span>Lecture_04_Slides.pdf<small>Lecture 4 Slides · Slide 12</small></span></span></div></div></div>
                  <button class="reset" id="rs" type="button" hidden>Try the card again</button>
                </div>
              </div>
            </div>
          </section>

          <!-- IMPACT -->
          <section class="sec" id="impact">
            <div class="c">
              <div class="sh">
                <div class="eb"><i>08</i>Evaluation & impact</div>
                <h2>From "tricky to find the upload button" to 8.14 out of 10</h2>
                <p class="lede">The same seven students came back, so this is a true before and after.</p>
              </div>
              <div class="im">
                <div class="sc">
                  <span class="kick">Mean overall rating</span>
                  <div class="num" style="margin-top:12px"><span data-to="8.14" data-dec="2">8.14</span><small>/ 10</small></div>
                  <div class="scale" id="scale"><div class="rg"></div><div class="mk"></div></div>
                  <div class="ticks"><span>0</span><span>5</span><span>10</span></div>
                  <p class="rn">Shaded band shows the range, 7 to 9.</p>
                </div>
                <div class="sv">
                  <div><span class="num" style="color:var(--green)"><span data-to="7">7</span>/7</span><p>said the redesign was a clear improvement</p><div class="pb"><i style="--v:100%;background:var(--green)"></i></div></div>
                  <div><span class="num"><span data-to="7">7</span>/7</span><p>would use ClassQuest regularly if it fully worked</p><div class="pb"><i style="--v:100%"></i></div></div>
                </div>
              </div>

              <div class="hj">
                <div class="hc"><span class="kick">Engagement</span><span class="num"><span data-to="12">12</span><small style="font-size:.45em;color:var(--muted);letter-spacing:0;font-weight:500"> min</small></span><p>average session, about 12 pages each</p></div>
                <div class="hc"><span class="kick">Friction</span><span class="num">0</span>
                  <svg class="tk" viewBox="0 0 156 20" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="tkp" width="1" height="20" patternUnits="userSpaceOnUse"><rect width=".34" height="20" fill="#8a8da0"/></pattern></defs><rect width="156" height="20" fill="url(#tkp)"/></svg>
                  <p>rage clicks in 156 recorded clicks</p></div>
                <div class="hc"><span class="kick">Attention</span>
                  <svg class="rg" viewBox="0 0 100 100" role="img" aria-label="89.8 percent scroll depth"><circle cx="50" cy="50" r="42" fill="none" stroke="rgba(138,141,160,.25)" stroke-width="9"/><circle class="ring" id="ring" cx="50" cy="50" r="42" pathLength="1" transform="rotate(-90 50 50)"/><text x="50" y="57" text-anchor="middle" font-family="Circular Std, sans-serif" font-weight="700" font-size="21" fill="#161a2b">89.8%</text></svg>
                  <p>average scroll depth</p></div>
              </div>
              <p class="top3"><span class="kick">Top clicks</span>Upload Sources <em>/</em> Next <em>/</em> Generate My First Quiz</p>
              <blockquote class="pq" style="margin-top:72px"><p>"The previous version seemed a little tricky to use when I had to find the option for uploading sources, but now it was way quicker and easier to do so."</p><cite>R7, Phase 3 evaluation</cite></blockquote>
            </div>
          </section>

          <!-- GUIDELINES -->
          <section class="sec alt" id="guidelines">
            <div class="c">
              <div class="sh">
                <div class="eb"><i>09</i>Design guidelines</div>
                <h2>15 guidelines for AI assisted class wikis</h2>
                <p class="lede">Five clusters, grounded in what the studies showed.</p>
              </div>
              <div id="gls"></div>
            </div>
          </section>

          <!-- REFLECTIONS -->
          <section class="sec" id="reflections">
            <div class="c">
              <div class="sh">
                <div class="eb"><i>10</i>Reflections & future scope</div>
                <h2>What this project actually taught me</h2>
              </div>
              <div class="rg2">
                <div class="rf"><span class="kick t">Tension</span><h3>Transparency vs. simplicity</h3><p>Citations add density in service of trust, the exact thing students wanted less of. It needs constant calibration.</p></div>
                <div class="rf"><span class="kick t">Tension</span><h3>Voice UI isn't the only AI interface</h3><p>The product stayed fully visual and still felt AI native through citations and inline assists.</p></div>
                <div class="rf"><span class="kick n">Next</span><h3>Recurring feedback becomes routine suggestions</h3><p>Repeated corrections could prompt the system to offer a saved routine.</p></div>
                <div class="rf"><span class="kick n">Next</span><h3>Test with a working AI backend</h3><p>Testing used pre written AI content. Real latency, errors and citation accuracy still need testing.</p></div>
              </div>
              <p class="endn">The upload flow stayed the hardest problem across both redesigns. One mislabeled button can undo a well tested concept.</p>
            </div>
          </section>

          <footer class="cf"><div class="c"><div class="lg"><svg class="capw" aria-hidden="true"><use href="#capsym"/></svg>ClassQuest</div><p>Case study by Sohaib Bin Kamran · Master in Human Computer Interaction, University of Siegen · Based on the thesis "User Experience (HCI) for AI-based Knowledge Transfer in Education."</p></div></footer>
          <section class="cta"><h2>Why wait? Take the leap. Make your design process stress free today.</h2><a href="/contact/" data-nav>Let's Talk?</a></section>
        </div>

<nav class="rail" id="rail" aria-label="Case study sections"><ol></ol></nav>
<div class="fab" id="fab"><button type="button" aria-expanded="false" aria-controls="mn"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 3.5h10M2 7h10M2 10.5h6"/></svg>Sections</button><div class="mn" id="mn"></div></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
