const twitterShareUrl = "https://twitter.com/intent/tweet?button_hashtag=";
const facebookShareUrl = "https://www.facebook.com/plugins/share_button.php?href=";
//cannot be shared from websites:
//https://stackoverflow.com/questions/30542054/does-instagram-have-share-button-or-not
//const instagramShareUrl = "https://www.facebook.com/plugins/share_button.php?href=";

//https://www.facebook.com/plugins/share_button.php?href=https://www.google.com.br/pessoas&layout=button&size=large&width=123&height=28&appId

function getShareUrlTwitter(){
    return twitterShareUrl+window.location.href+"&ref_src=twsrc%5Etfw";
}

function getShareUrlFacebook(){
    return facebookShareUrl+window.location.href+"&layout=button&size=large&width=123&height=28&appId";
}

//cannot be shared from websites:
//https://stackoverflow.com/questions/30542054/does-instagram-have-share-button-or-not
/*function getShareUrlInstagram(){
    return instagramShareUrl+window.location.href;
}*/

export default{
    getShareUrlTwitter,
    getShareUrlFacebook
};