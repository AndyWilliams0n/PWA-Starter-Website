// JS

console.log('WELCOME TO PWA');



// Service Workers and PUSH

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(r => {
            console.log('REGISTERED', r);

            setTimeout(() => isPushSupported(r), 1000)
        }).catch(e => {
            console.log('NOT REGISTERED');
        });
    })
}

function isPushSupported(r) {
    if ('PushManager' in window) {
        console.log('PUSH SUPPORTED');

        getSubscription(r);
    } else {
        console.log('PUSH NOT SUPPORTED');
    }
}

function getSubscription(r) {
    r.pushManager.getSubscription().then(sub => {
        const isSub = !!sub;

        if (isSub) {
            console.log('SUBSCRIBED FOR PUSH');
        } else {
            console.log('NOT SUBSCRIBED FOR PUSH');

            subscribeForPush(r);
        }
    })
}

function subscribeForPush(r) {
    console.log('SUBSCRIBING');

    // Fake Public Key Generated from a VAPID Key Generator: REPLACE
    const publicKey = base64UrlToUint8Array('BFMGlFSJVJXx9MFjm8VZcBhILvJizPuI36Ub5GBrYnCaMSammWB5D6L2UpUDpvDqEx54c0p9mnHaogF_afRWc0k');

    r.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey
    }).then(push => {
        console.log('SUBSCRIBED FOR PUSH', push);
    })
}



// Install to home screen

let deferredPrompt;
let addToHome = document.getElementById('AddToHome');

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('BEFORE INSTALL PROMPT')

    event.preventDefault();
    deferredPrompt = event;

    addToHome.style.display = 'inline-block';
})

addToHome.addEventListener('click', (event) => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
        console.log('BEFORE INSTALL CHOICE', choice);
    });
})

window.addEventListener('appinstalled', (event) => {
    console.log('APP INSTALLED');
})



// Helpers

function base64UrlToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}