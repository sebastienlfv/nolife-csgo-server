<? 

  require 'steamauth/steamauth.php';
  require 'steamauth/userInfo.php';

  if(isset($_SESSION['steamid'])) {
    $id = $_SESSION['steamid'];
  } else {
    #Not logged in
  }

?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./client/style/style.css">
  <script src="./client/js/index.js" defer></script>
  <title>NOLIFE - HOME</title>
</head>
<body>
  <div class="container-website">
    <header>
      <nav>
        <a href="./index.html"><img src="./client/src/images/logo-Nolife.webp" alt="nolife"></a>
        <div class="navigation">
          <a href="#"><div>VIP</div></a>
            <a href="./client/serveurs.html"><div>Nos serveurs</div></a>
            <a href="#"><div>Contact</div></a>
            <div class="steam-account">
              <? if(isset($_SESSION['steamid'])) {?>
                <div class="dropdown">
                  <a href="#" style='display: flex; align-items: center;'><img style='width: 40px; border-radius: 5px' src="<?=$steamprofile['avatar'];?>"><b style='margin-left: 10px;'><?=$steamprofile['personaname']?></b></a>
                  <div class="dropdown-content">
                    <span>Option1</span>
                    <span>Option2</span>
                    <span>Option3</span>
                    <a href='logout.php'>Logout</a>
                  </div>
                </div>
              <? } else { ?>
                <? echo loginbutton(); ?>
              <? } ?>
            </div>
        </div>
      </nav>
    </header>
    <main>
      <section class="info-container">
        <div class="info-nolife vip-avantage">
          <img src="./client/src/images/icon/VIP.png">
          <ul>
            <li>Un slot réserver sur tous les serveurs.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
        <div class="info-nolife">
          <img src="./client/src/images/icon/question-mark.png">
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
        <div class="info-nolife">
          <img src="./client/src/images/icon/question-mark.png">
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
      </section>
      <section class="general-container">
        <div class="left-container">
          <div class="header-leftside">
            <h2>Nolife <span>Serveurs</span></h2>
            <p>Des modes de jeux qui plaise à tout le monde !</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum ea nulla dolorum, nemo eveniet ex, 
            illo natus dignissimos modi iusto nesciunt, in dolorem placeat quam ratione excepturi aliquid ullam 
            iste. Quo perspiciatis quaerat omnis ab. Autem voluptatem laborum aperiam mollitia?
          </p>
          <div class="joinus">
            <a href="https://discord.gg/pJYkC8TD" target="_blank"><button>Rejoins nous !</button></a>
          </div>
        </div>
        <div class="right-container">
          <video controls>
            <source src="./client/src/images/video/sample-mp4-file.mp4" type="video/mp4">
          </video>
        </div>
      </section>
    </main>
  </div>
  <footer>
    <div class="footer-partner">
      <img src="./client/src/images/partner/impact.png">
      <img src="./client/src/images/partner/five.png">
      <img src="./client/src/images/partner/logo-rez.png">
      <img src="./client/src/images/partner/logo.png">
      <img src="./client/src/images/partner/thugz.png">
    </div>
  </footer>
</body>
</html>