
var distributorNumber = 1;
var distributorTimer;
var distributorRotateTime = 3000;
var distributorRotatedCount = 0;


function EndTask(success) {
    if (success) {
      $('.modal__alert').text('Task completed!');
    }else {
      $('.modal__alert').text('Task Failed!');

    }

    $('.modal').addClass('modal_show');
    setTimeout(function(){
      $('.modal').removeClass('modal_show');
      $('.modal').addClass('hidden');
      $('.task').addClass('hidden');
      $.post('https://calibrate-distributor/callback', JSON.stringify({
        success
      }));
    }, 1500);

}

function startDistributor() {
  distributorNumber = 1;
  $('.distributor__block').removeClass('distributor__block_active').removeClass('distributor__block_set');
  $('.distributor__thumb').stop();
  $('.distributor__thumb').css('margin-right', '').css('transform', 'translate(0px, -5px) rotate(-150deg)');
  $('.distributor__btn').prop('disabled', false);
  launchDistributor();
}

function launchDistributor() {
  clearTimeout(distributorTimer);
  distributorRotatedCount = 0;
  distributorRotateTime = 3000;
  $('.distributor__left-panel .distributor__block').removeClass('distributor__block_active');
  $('.distributor__left-panel .distributor__block:nth-child(' + (distributorNumber + 1) + ')').addClass('distributor__block_active');
  $('.distributor__block_active .distributor__thumb').stop();
  $('.distributor__block_active .distributor__thumb').css('margin-right', '').css('transform', 'translate(0px, -5px) rotate(-150deg)');
  startDistributorRotation();
  distributorTimer = setTimeout(startDistributorRotation, distributorRotateTime > 0 ? distributorRotateTime : 3000);
}

function startDistributorRotation() {
  clearTimeout(distributorTimer);
  $('.distributor__block_active .distributor__thumb').animate({ 'margin-right': 100 }, {
    step: function(now, fx) {
      var angle = now / 100 * 360;
      $('.distributor__block_active .distributor__thumb').css('transform', 'translate(0px, -5px) rotate(calc(-150deg - ' + (angle) + 'deg))');
      if (Math.abs(angle - 120) <= 10) {
        $('.distributor__block:nth-child(' + (distributorNumber + 1) + ')').addClass('distributor__block_set');
      } else {
        $('.distributor__block:nth-child(' + (distributorNumber + 1) + ')').removeClass('distributor__block_set');
      }
    },
    duration: distributorRotateTime > 0 ? distributorRotateTime : 3000,
    easing: 'linear',
    complete: function() {
      $('.distributor__block_active .distributor__thumb').css('margin-right', '').css('transform', 'translate(0px, -5px) rotate(-150deg)');
      distributorRotatedCount++;
    }
  },);
  distributorTimer = setTimeout(startDistributorRotation, distributorRotateTime);
  distributorRotatedCount++;
  if (distributorRotatedCount == 1) {
    distributorRotateTime = 4000;
  } else if (distributorRotatedCount > 1) {
    distributorRotateTime = 5000;
  }
}

$('.distributor__btn').on('click', function() {
  if ($(this).closest('.distributor__block').hasClass('distributor__block_set') && distributorNumber == $(this).closest('.distributor__block').index()) {
    clearTimeout(distributorTimer);
    $('.distributor__block_active .distributor__thumb').stop();
    $('.distributor__block_active .distributor__thumb').css('transform', 'translate(0px, -5px) rotate(-270deg)');
    distributorNumber++;
    if (distributorNumber == 4) {
      success = true;
      EndTask(true);
    }
    launchDistributor();
    $(this).prop('disabled', true);
  } else {
    // startDistributor();
    $(this).prop('disabled', false);
    EndTask(false);

  }
});



window.addEventListener('message', function (event) {
    if (event.data.action == "ui") {
        if (event.data.toggle) {
            $('.modal').removeClass('hidden');
            $('.task').removeClass('hidden');
            startDistributor();
        } else {
            $('.modal').removeClass('modal_show');
            $('.modal').addClass('hidden');
            $('.task').addClass('hidden');
        }
    }
})


window.addEventListener("keydown", function (e) {
    if (e.keyCode == 27) {
        $('body').fadeOut(50);
        setTimeout(() => {
            $('.modal').removeClass('modal_show');
            $('.modal').addClass('hidden');
            $('.task').addClass('hidden');
        }, 250)
    }
})