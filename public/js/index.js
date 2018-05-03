$(function () {
    const loginWrap = $('.login-wrap')
    const registerWrap = $('.register-wrap')
    const welcomeWrap = $('.welcome-wrap')

    loginWrap
        .find('a.resiter-login')
        .on('click', function (event) {
            event.preventDefault();

            loginWrap.hide()
            registerWrap.show()
        })

    registerWrap
        .find('a.resiter-login')
        .on('click', function (event) {
            event.preventDefault();
            loginWrap.show()
            registerWrap.hide()
        })

    registerWrap
        .find('button')
        .on('click', () => {
            $.ajax({
                type: 'post',
                url: '/api/user/register',
                dataType: 'json',
                data: {
                    username: registerWrap
                        .find('[name="username"]')
                        .val(),
                    userpassword: registerWrap
                        .find('[name="userpassword"]')
                        .val(),
                    repassword: registerWrap
                        .find('[name="repassword"]')
                        .val()
                },
                success(res) {
                    // console.log(res)
                    registerWrap
                        .find(".warn-text")
                        .html(res.message)
                    if (!res.code) {
                        setTimeout(() => {
                            loginWrap.show()
                            registerWrap.hide()
                        }, 1000)
                    }
                }
            })
        })

    loginWrap
        .find('button')
        .on('click', () => {
            $.ajax({
                type: 'post',
                url: '/api/user/login',
                dataType: 'json',
                data: {
                    username: loginWrap
                        .find('[name="username"]')
                        .val(),
                    userpassword: loginWrap
                        .find('[name="userpassword"]')
                        .val()
                },
                success(res) {
                    // console.log(res)
                    loginWrap
                        .find(".warn-text")
                        .html(res.message)
                    if (!res.code) {
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    } else {}
                }
            })
        })

    welcomeWrap
        .find('button')
        .on('click', () => {
            $.ajax({
                type: 'get',
                url: '/api/user/loginout',
                data: {},
                success(res) {
                    welcomeWrap
                        .find(".warn-text")
                        .html(res.message)
                    if (!res.code) {
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    } else {}
                }
            })
        })

})