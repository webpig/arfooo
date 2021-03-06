$(document).data("popupStart", function(popupWindow){

    $("#lostPasswordPopupForm", popupWindow).validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            privateCode: "required"
        },
        messages: {
            privateCode: _t("Please enter captcha code"),
            email: {
                required: _t("Please enter your email"),
                email: _t("Your email must be in format - name@domain.com")
            }
        },
        errorPlacement: function(){
        
        },
        submitHandler: function(form){
            $(form).ajaxSubmit({
                dataType: 'json',
                success: function(response){
                    if (response.status == "error") {
                        $.alertDialog(response.message);
                        $("a.linkGenerateNewCaptchaImg", form).click();
                    }
                    
                    if (response.status == "ok") {
                        $.alertDialog(_t("New password was sent to your email"), function(){
                            popupWindow.dialog("close");
                        });
                    }
                    
                }
            });
            return false;
        }
    });
    
    $("input.close", popupWindow).click(function(){
        popupWindow.dialog("close");
    });
    
});
