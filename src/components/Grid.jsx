function Grid() {
  function handleChannelClick(e) {
    e.preventDefault();
    console.log('Channel clicked');
    if (e.target.getAttribute('data-click-state') == 1) {
      e.target.setAttribute('data-click-state', 0);
      e.target.style.fontVariationSettings = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48";
    } else {
      e.target.setAttribute('data-click-state', 1);
      e.target.style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48";
    }
  }
  return (
    <div id="guide">
        <style>
            {`
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap');
            .material-symbols-outlined {
              font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
            }
            body {
              background-color: #000;
            }
            #guide {
              display: flex;
              flex-direction: column;
              overflow-x: auto;
            }
            .row {
              display: flex;
              justify-content: flex-start;
              flex-direction: row;
            }
            .cell {
              flex-grow: 0;
              /* do not grow   - initial value: 0 */
              flex-shrink: 0;
              /* do not shrink - initial value: 1 */
              display: flex;
              justify-content: flex-start;
              align-items: center;
              background-color: #1E1E1E;
              margin: 1px;
              border-radius: 2px;
              cursor: pointer;
            }
            .cell:hover {
              background-color: #565656;
              color: #FFFFFF;
            }
            .cell > span {
              font-family: 'Open Sans', sans-serif;
              font-weight: 300;
              font-size: 20px;
              padding: 0 16px;
              height: 24px;
              display: inline-block;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            .channel-cell {
              flex-grow: 0;
              /* do not grow   - initial value: 0 */
              flex-shrink: 0;
              /* do not shrink - initial value: 1 */
              background-color: #1E1E1E;
              margin: 1px;
              border-radius: 2px;
              cursor: pointer;
            }
            .time-cell {
              flex-grow: 0;
              /* do not grow   - initial value: 0 */
              flex-shrink: 0;
              /* do not shrink - initial value: 1 */
              background-color: #1E1E1E;
              margin: 1px;
              border-radius: 2px;
              cursor: pointer;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              width: 250px;
              height: 50px;
            }
            .time-cell > span {
              font-family: 'Open Sans', sans-serif;
              color: #FFF;
              font-weight: 300;
              font-size: 20px;
              padding: 0 16px;
              height: 24px;
            }
            #ch_number {
              font-family: 'Open Sans', sans-serif;
              color: #878b91;
              font-weight: 500;
              font-size: 20px;
              padding: 0 16px;
              height: 24px;
              transition: all 0.5s ease;
              cursor: pointer;
              position: relative;
              left: -20px;
            }
            .ch_logo {
              display: flex;
              cursor: pointer;
            }
            .material-symbols-outlined {
              color: white;
              position: relative;
              left: -45px;
              transition: all 0.25s ease;
            }
            .channel {
              width: 200px;
              background: linear-gradient(90deg, #090909 0%, #262626 35.87%);
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }
            .ch_number {
              display: flex;
              align-items: center;
              transition: all 0.1s ease;
            }
            .ch_number:hover .material-symbols-outlined {
              position: relative;
              left: 26px;
              cursor: pointer;
            }
            .ch_number:hover #ch_number {
              opacity: 0;
            }
            .channel-top {
              width: 200px;
              height: 50px;
              background: linear-gradient(90deg, #090909 0%, #262626 35.87%);
            }
            .time-15 {
              width: 124px;
              height: 70px;
            }
            .time-30 {
              width: 250px;
              height: 70px;
            }
            .time-60 {
              width: 502px;
              height: 70px;
            }
            .on-now {
              color: #FFFFFF;
              background-color: #343434;
            }
            .on-next {
              color: #B0B0B0;
              background-color: #1E1E1E;
            }
            #on-now {
              background-color: #458B00;
              padding: 13px 80px 13px 16px;
              border-right: 2px solid #60BF02;
            }
            .arrow-down {
              position: relative;
              left: -9px;
              top: -20px;
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 10px solid #60BF02;
            }
            
            `}
        </style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
      <div class="row timeline">
        <div class="time-cell channel-top"></div>
        <div class="time-cell">
          <span id="on-now">On now</span>
          <div class="arrow-down"></div>
        </div>
        <div class="time-cell">
          <span>7:00 PM</span>
        </div>
        <div class="time-cell">
          <span>7:30 PM</span>
        </div>
        <div class="time-cell">
          <span>8:00 PM</span>
        </div>
        <div class="time-cell">
          <span>8:30 PM</span>
        </div>
        <div class="time-cell">
          <span>9:00 PM</span>
        </div>
        <div class="time-cell">
          <span>9:30 PM</span>
        </div>
        <div class="time-cell">
          <span>10:00 PM</span>
        </div>
        <div class="time-cell">
          <span>10:30 PM</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">100</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s71733_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>

        <div class="cell time-30 on-now">
          <span>Christmas Reservations</span>
        </div>
        <div class="cell time-30 on-next">
          <span>CBC Edmonton News</span>
        </div>
        <div class="cell time-15 on-next">
          <span>CBC Edmonton News</span>
        </div>
        <div class="cell time-30 on-next">
          <span>The Holiday</span>
        </div>
        <div class="cell time-15 on-next">
          <span>The National</span>
        </div>
        <div class="cell time-30 on-next">
          <span>CBC Edmonton News</span>
        </div>
        <div class="cell time-60 on-next">
          <span>CBC Edmonton News</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">101</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://tl-images-stb-opus.cdn.avp.telus.net/v1/static/prod/live/b5bfe23a-1d07-4abb-9dfc-3ab6bdfdac0f.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-60 on-now">
          <span>A Kinderhearted Christmas</span>
        </div>
        <div class="cell time-30 on-next">
          <span>The Big Bang Theory</span>
        </div>
        <div class="cell time-30 on-next">
          <span>A Kinderhearted Christmas</span>
        </div>
        <div class="cell time-15 on-next">
          <span>E Talk</span>
        </div>
        <div class="cell time-60 on-next">
          <span>A Kinderhearted Christmas</span>
        </div>
        <div class="cell time-15 on-next">
          <span>A Kinderhearted Christmas</span>
        </div>
        <div class="cell time-30 on-next">
          <span>A Kinderhearted Christmas</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">102</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://tl-images-stb-opus.cdn.avp.telus.net/v1/static/prod/live/369244a3-2578-43c4-9963-775df6df1f48.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-15 on-now">
          <span>Alberta Primetime</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Cash Cab</span>
        </div>
        <div class="cell time-60 on-next">
          <span>The Big Bang Theory</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Cash Cab</span>
        </div>
        <div class="cell time-15 on-next">
          <span>The Big Bang Theory</span>
        </div>
        <div class="cell time-30 on-next">
          <span>The Big Bang Theory</span>
        </div>
        <div class="cell time-60 on-next">
          <span>The Big Bang Theory</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">104</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s63641_ld_h15_ab.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-60 on-now">
          <span>Global News Hour at 6</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Global News Hour at 6</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Global News Hour at 6</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Global News Hour at 6</span>
        </div>
        <div class="cell time-60 on-next">
          <span>Global News Hour at 6</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Global News Hour at 6</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Global News Hour at 6</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">106</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s68327_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-30 on-now">
          <span>City News at 6 Edmonton</span>
        </div>
        <div class="cell time-30 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
        <div class="cell time-15 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
        <div class="cell time-30 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
        <div class="cell time-15 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
        <div class="cell time-15 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
        <div class="cell time-60 on-next">
          <span>City News at 6 Edmonton</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">113</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s124895_ld_h9_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-60 on-now">
          <span>Inuit TV Programming</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Inuit TV Programming</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Inuit TV Programming</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Inuit TV Programming</span>
        </div>
        <div class="cell time-60 on-next">
          <span>Inuit TV Programming</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Inuit TV Programming</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Inuit TV Programming</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">119</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s72805_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-15 on-now">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div class="cell time-30 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div class="cell time-15 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div class="cell time-60 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div class="cell time-60 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div class="cell time-30 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
        <div class="cell time-15 on-next">
          <span>OMNI News: Punjabi Edition</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">120</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s105304_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-30 on-now">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div class="cell time-60 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div class="cell time-15 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div class="cell time-60 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div class="cell time-15 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div class="cell time-15 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
        <div class="cell time-15 on-next">
          <span>OMNI News: Pilipino Edition</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">123</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s27503_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-60 on-now">
          <span>People Who Sing Together</span>
        </div>
        <div class="cell time-30 on-next">
          <span>People Who Sing Together</span>
        </div>
        <div class="cell time-30 on-next">
          <span>People Who Sing Together</span>
        </div>
        <div class="cell time-15 on-next">
          <span>People Who Sing Together</span>
        </div>
        <div class="cell time-30 on-next">
          <span>People Who Sing Together</span>
        </div>
        <div class="cell time-15 on-next">
          <span>People Who Sing Together</span>
        </div>
        <div class="cell time-60 on-next">
          <span>People Who Sing Together</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">124</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s72855_ld_h15_ab.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-60 on-now">
          <span>Hawaii Five-0</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Hawaii Five-0</span>
        </div>
        <div class="cell time-30 on-next">
          <span>CBN NewsWatch</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Hawaii Five-0</span>
        </div>
        <div class="cell time-60 on-next">
          <span>Hawaii Five-0</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Hawaii Five-0</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Hawaii Five-0</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">125</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s61998_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-15 on-now">
          <span>Despicable Me 2</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Despicable Me 2</span>
        </div>
        <div class="cell time-60 on-next">
          <span>Despicable Me 2</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Despicable Me 2</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Despicable Me 2</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Despicable Me 2</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Despicable Me 2</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">127</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s72183_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-30 on-now">
          <span>The Regional</span>
        </div>
        <div class="cell time-15 on-next">
          <span>The Regional</span>
        </div>
        <div class="cell time-60 on-next">
          <span>The Regional</span>
        </div>
        <div class="cell time-15 on-next">
          <span>The Regional</span>
        </div>
        <div class="cell time-15 on-next">
          <span>The Regional</span>
        </div>
        <div class="cell time-30 on-next">
          <span>The Regional</span>
        </div>
        <div class="cell time-30 on-next">
          <span>The Regional</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">128</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s72183_ld_h15_aa.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-15 on-now">
          <span>The Regional</span>
        </div>
        <div class="cell time-30 on-next">
          <span>BC Today</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Hot and Cold</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Hot and Cold</span>
        </div>
        <div class="cell time-30 on-next">
          <span>Hot and Cold</span>
        </div>
        <div class="cell time-15 on-next">
          <span>Hot and Cold</span>
        </div>
        <div class="cell time-60 on-next">
          <span>Friday</span>
        </div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">129</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://gn-images-stb-opus.cdn.avp.telus.net/assets/s90941_ld_h15_ab.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-30 on-now"></div>
        <div class="cell time-30 on-next"></div>
        <div class="cell time-15 on-next"></div>
        <div class="cell time-30 on-next"></div>
        <div class="cell time-15 on-next"></div>
        <div class="cell time-60 on-next"></div>
        <div class="cell time-30 on-next"></div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">131</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://tl-images-stb-opus.cdn.avp.telus.net/v1/static/prod/live/3af64afe-3b4f-42ad-911a-c69e778defe2.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-30 on-now"></div>
        <div class="cell time-30 on-next"></div>
        <div class="cell time-15 on-next"></div>
        <div class="cell time-60 on-next"></div>
        <div class="cell time-15 on-next"></div>
        <div class="cell time-60 on-next"></div>
        <div class="cell time-30 on-next"></div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">134</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://tl-images-stb-opus.cdn.avp.telus.net/v1/static/prod/live/f6b29930-3526-4416-9ac6-37efaed877d3.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-60 on-now"></div>
        <div class="cell time-30 on-next"></div>
        <div class="cell time-15 on-next"></div>
        <div class="cell time-15 on-next"></div>
        <div class="cell time-60 on-next"></div>
        <div class="cell time-15 on-next"></div>
        <div class="cell time-30 on-next"></div>
      </div>
      <div class="row">
        <div class="channel-cell channel">
          <div class="ch_number" onClick={handleChannelClick}>
            <span class="material-symbols-outlined">favorite</span>
            <span id="ch_number">135</span>
          </div>

          <a href="#" class="ch_logo">
            <img
              src="https://tl-images-stb-opus.cdn.avp.telus.net/v1/static/prod/live/18e4a4fa-bab5-4706-8f7c-5bdc71c8b2d6.png?w=80"
              width="76px"
            />
          </a>
        </div>
        <div class="cell time-15 on-now"></div>
        <div class="cell time-30 on-next"></div>
        <div class="cell time-15 on-next"></div>
        <div class="cell time-30 on-next"></div>
        <div class="cell time-15 on-next"></div>
        <div class="cell time-15 on-next"></div>
        <div class="cell time-30 on-next"></div>
      </div>
    </div>
  );
}

export default Grid;
