import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import Navbar from '../components/navbar/navbar';

const Home = () => {
    const [scrollPos, setScrollPos] = useState(0);
    const [actualIndex, setActualIndex] = useState<number>()
    const [isScrollingUp, setIsScrollingUp] = useState(false)
    const [isScrollingDown, setIsScrollingDown] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [arr, setArr] = useState<number[]>()
    const [divBottom, setDivBottom] = useState<boolean>(false)
    const [divTop, setDivTop] = useState<boolean>(false)

    const [isUp, setIsUp] = useState<boolean>(false)

    useEffect(() => {
        const s0 = document.querySelector('.s0')!.getBoundingClientRect();
        const s1 = document.querySelector('.s1')!.getBoundingClientRect();
        const s2 = document.querySelector('.s2')!.getBoundingClientRect();
        const s3 = document.querySelector('.s3')!.getBoundingClientRect();
        let arrs = [s0.top, s1.top, s2.top, s3.top];
        setArr(arrs)
        console.log(arrs)
    }, []);

    const listInnerRef = useRef<any>();
    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop == 0) {
                setDivTop(true)
                console.log('Reached top')
            }
            else {
                console.log("no es 0 es ", scrollTop)
                setDivTop(false)
            }
            if (scrollTop + clientHeight == scrollHeight) {
                // TO SOMETHING HERE
                setDivBottom(true)
                console.log('Reached bottom')
            } else {
                setDivBottom(false)
            }
            //if(scrollTop != 0 || ((scrollTop + clientHeight) != scrollHeight)){
            //    setDivTop(false)
            //    setDivBottom(false)
            //}
        }
    };

    const detectWheel = (e: any) => {
        if (e.repeat) { return }
        if (!arr) { return }

        let s0 = $('.s0')
        let s1 = $('.s1')
        let s2 = $('.s2')
        let s3 = $('.s3')
        let dif = arr[1] - arr[0]

        console.log("como!")

        if (e.wheelDelta < 0) {
            let valueS0 = parseFloat(s0.css('transform').split(',')[5])
            let toGoS0 = valueS0 - dif

            if (arr.includes(Math.abs(toGoS0)) /*&& Math.abs(valueS0) != arr[1]*/) {
                let valueS1 = parseFloat(s1.css('transform').split(',')[5])
                let toGoS1 = valueS1 - dif
                let valueS2 = parseFloat(s2.css('transform').split(',')[5])
                let toGoS2 = valueS2 - dif
                let valueS3 = parseFloat(s3.css('transform').split(',')[5])
                let toGoS3 = valueS3 - dif

                s0.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS0})`);
                s1.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS1})`);
                s2.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS2})`);
                s3.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS3})`);
            }
            if (Math.abs(toGoS0) != arr[0] && arr.indexOf(Math.abs(toGoS0)) > -1) {
                $('.smooth-navbar').addClass('active')
            }
            else if (Math.abs(toGoS0) == arr[0] && arr.indexOf(Math.abs(toGoS0)) > -1) {
                $('.smooth-navbar').removeClass('active')
            }
            /*if(Math.abs(valueS0) == arr[1] && divBottom){
                
                let valueS1 = parseFloat(s1.css('transform').split(',')[5])
                let toGoS1 = valueS1 - dif
                let valueS2 = parseFloat(s2.css('transform').split(',')[5])
                let toGoS2 = valueS2 - dif
                let valueS3 = parseFloat(s3.css('transform').split(',')[5])
                let toGoS3 = valueS3 - dif

                s0.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS0})`);
                s1.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS1})`);
                s2.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS2})`);
                s3.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS3})`);
            }*/
        }
        else {
            let valueS0 = parseFloat(s0.css('transform').split(',')[5])
            let toGoS0 = valueS0 + dif
            if (valueS0 == arr[0]) {
                toGoS0 = 0
            }
            if (arr.includes(Math.abs(toGoS0)) && valueS0 != 0) {
                let valueS1 = parseFloat(s1.css('transform').split(',')[5])
                let toGoS1 = valueS1 + dif
                let valueS2 = parseFloat(s2.css('transform').split(',')[5])
                let toGoS2 = valueS2 + dif
                let valueS3 = parseFloat(s3.css('transform').split(',')[5])
                let toGoS3 = valueS3 + dif

                s0.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS0})`);
                s1.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS1})`);
                s2.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS2})`);
                s3.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS3})`);
            }
            if (Math.abs(toGoS0) != arr[0] && arr.indexOf(Math.abs(toGoS0)) > -1) {
                $('.smooth-navbar').addClass('active')
            }
            else if (Math.abs(toGoS0) == arr[0] && arr.indexOf(Math.abs(toGoS0)) > -1) {
                $('.smooth-navbar').removeClass('active')
            }
        }
    }

    const detectKey = (e: any) => {
        if (e.repeat) { return }
        if (!arr) { return }
        if (["ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
            let s0 = $('.s0')
            let s1 = $('.s1')
            let s2 = $('.s2')
            let s3 = $('.s3')
            let dif = arr[1] - arr[0]

            if (e.code == 'ArrowDown') {
                let valueS0 = parseFloat(s0.css('transform').split(',')[5])
                let toGoS0 = valueS0 - dif
                console.log(toGoS0, arr[0])
                if (arr.includes(Math.abs(toGoS0))) {
                    let valueS1 = parseFloat(s1.css('transform').split(',')[5])
                    let toGoS1 = valueS1 - dif
                    let valueS2 = parseFloat(s2.css('transform').split(',')[5])
                    let toGoS2 = valueS2 - dif
                    let valueS3 = parseFloat(s3.css('transform').split(',')[5])
                    let toGoS3 = valueS3 - dif

                    s0.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS0})`);
                    s1.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS1})`);
                    s2.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS2})`);
                    s3.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS3})`);
                }

                if (Math.abs(toGoS0) != arr[0] && arr.indexOf(Math.abs(toGoS0)) > -1) {
                    $('.smooth-navbar').addClass('active')
                }
                else if (Math.abs(toGoS0) == arr[0] && arr.indexOf(Math.abs(toGoS0)) > -1) {
                    $('.smooth-navbar').removeClass('active')
                }

            }

            if (e.code == 'ArrowUp') {
                let valueS0 = parseFloat(s0.css('transform').split(',')[5])
                let toGoS0 = valueS0 + dif
                if (valueS0 == arr[0]) {
                    toGoS0 = 0
                }

                console.log(toGoS0, arr[0])
                if (arr.includes(Math.abs(toGoS0)) && valueS0 != 0) {
                    let valueS1 = parseFloat(s1.css('transform').split(',')[5])
                    let toGoS1 = valueS1 + dif
                    let valueS2 = parseFloat(s2.css('transform').split(',')[5])
                    let toGoS2 = valueS2 + dif
                    let valueS3 = parseFloat(s3.css('transform').split(',')[5])
                    let toGoS3 = valueS3 + dif

                    s0.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS0})`);
                    s1.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS1})`);
                    s2.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS2})`);
                    s3.css('transform', `matrix(1, 0, 0, 1, 0, ${toGoS3})`);
                }
                if (Math.abs(toGoS0) != arr[0] && arr.indexOf(Math.abs(toGoS0)) > -1) {
                    $('.smooth-navbar').addClass('active')
                }
                else if (Math.abs(toGoS0) == arr[0] && arr.indexOf(Math.abs(toGoS0)) > -1) {
                    $('.smooth-navbar').removeClass('active')
                }

            }
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', detectKey, false);
        window.addEventListener('mousewheel', detectWheel, false);
    }, [arr, divBottom, divTop])

    useEffect(() => {
        $('.casino-body').on('scroll', function (e) {
            console.log($(this).scrollTop()!)
            setScrollPos($(this).scrollTop()!)
        });
    }, [])


    return (
        <div className="casino-body">
            <Navbar />
            <section className='s0'>
                <div className="box-section">
                    <h1>Hola que hace</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quod sint incidunt aut nam distinctio ex harum provident, debitis saepe, sequi voluptates nulla aperiam accusantium consequuntur quae facere praesentium dolores?</p>
                    <h2>Sub title</h2>
                    <h3>Sub sub title</h3>
                    <h4>sub sub title</h4>
                </div>
            </section>
            <section className='s1'>


                {/*<div className="godown" onScroll={() => onScroll()} ref={listInnerRef}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et eligendi nulla aliquid delectus sunt voluptatibus mollitia enim ut aliquam, tempore veritatis dolor commodi architecto repudiandae sit eius distinctio ipsam cupiditate!
                    Sunt quibusdam expedita harum corrupti, obcaecati voluptatibus quo illum. Cumque voluptatum repudiandae molestiae vero minus quidem eius dignissimos facere voluptatibus obcaecati nihil esse, voluptate error sed quas. Distinctio, odio eum.
                    Quo earum eligendi blanditiis repellat nam dignissimos magnam rem sed, hic culpa maxime eius alias illum repellendus. Delectus in, laudantium vel sit laborum eaque doloremque est quod. Esse, consequatur nostrum.
                    Totam possimus eligendi ex consequuntur nostrum atque amet molestias, deserunt quos vel adipisci porro, corrupti, nihil provident. Accusantium ipsa sapiente debitis ab adipisci, doloremque eaque est architecto, exercitationem voluptatibus maiores.
                    Itaque veniam nisi eligendi veritatis rem doloribus rerum inventore magni numquam, ducimus reiciendis aut similique voluptas expedita fugit sequi nihil totam eaque est placeat labore dolores. Expedita modi unde nesciunt.
                    Iure, quis, neque, debitis officia nostrum repellat tempore ipsam consectetur eveniet provident sint eum sapiente vero eius quisquam aspernatur quasi ullam cumque impedit aut natus perspiciatis. Esse id alias maiores.
                    Incidunt ipsa dolore nobis iste fugiat, libero eius necessitatibus beatae porro culpa! Natus a dolor perspiciatis itaque corrupti magnam, aut, laborum officia praesentium officiis quaerat! Dignissimos nihil unde recusandae soluta.
                    Quis, ea velit officia, amet ex blanditiis esse, quaerat illo iusto molestiae dolores dignissimos? Vero voluptatum quaerat fugit ratione asperiores temporibus, voluptatem, ab dolorem est tempore incidunt aperiam. Asperiores, ut?
                    Amet, veritatis qui temporibus dignissimos aut earum fugiat, ducimus repellendus eum tempore quis odio voluptas ipsam. Quidem totam deserunt eos tenetur doloribus fugiat, assumenda eum vero nisi perspiciatis, aliquid in!
                    Assumenda, ipsam. Dolorum maiores impedit delectus quisquam provident excepturi, debitis, optio repellendus iusto explicabo qui nisi aliquid assumenda, perferendis deleniti soluta at odio laudantium nam aliquam ab illo. Nostrum, id!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et eligendi nulla aliquid delectus sunt voluptatibus mollitia enim ut aliquam, tempore veritatis dolor commodi architecto repudiandae sit eius distinctio ipsam cupiditate!
                    Sunt quibusdam expedita harum corrupti, obcaecati voluptatibus quo illum. Cumque voluptatum repudiandae molestiae vero minus quidem eius dignissimos facere voluptatibus obcaecati nihil esse, voluptate error sed quas. Distinctio, odio eum.
                    Quo earum eligendi blanditiis repellat nam dignissimos magnam rem sed, hic culpa maxime eius alias illum repellendus. Delectus in, laudantium vel sit laborum eaque doloremque est quod. Esse, consequatur nostrum.
                    Totam possimus eligendi ex consequuntur nostrum atque amet molestias, deserunt quos vel adipisci porro, corrupti, nihil provident. Accusantium ipsa sapiente debitis ab adipisci, doloremque eaque est architecto, exercitationem voluptatibus maiores.
                    Itaque veniam nisi eligendi veritatis rem doloribus rerum inventore magni numquam, ducimus reiciendis aut similique voluptas expedita fugit sequi nihil totam eaque est placeat labore dolores. Expedita modi unde nesciunt.
                    Iure, quis, neque, debitis officia nostrum repellat tempore ipsam consectetur eveniet provident sint eum sapiente vero eius quisquam aspernatur quasi ullam cumque impedit aut natus perspiciatis. Esse id alias maiores.
                    Incidunt ipsa dolore nobis iste fugiat, libero eius necessitatibus beatae porro culpa! Natus a dolor perspiciatis itaque corrupti magnam, aut, laborum officia praesentium officiis quaerat! Dignissimos nihil unde recusandae soluta.
                    Quis, ea velit officia, amet ex blanditiis esse, quaerat illo iusto molestiae dolores dignissimos? Vero voluptatum quaerat fugit ratione asperiores temporibus, voluptatem, ab dolorem est tempore incidunt aperiam. Asperiores, ut?
                    Amet, veritatis qui temporibus dignissimos aut earum fugiat, ducimus repellendus eum tempore quis odio voluptas ipsam. Quidem totam deserunt eos tenetur doloribus fugiat, assumenda eum vero nisi perspiciatis, aliquid in!
                    Assumenda, ipsam. Dolorum maiores impedit delectus quisquam provident excepturi, debitis, optio repellendus iusto explicabo qui nisi aliquid assumenda, perferendis deleniti soluta at odio laudantium nam aliquam ab illo. Nostrum, id!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et eligendi nulla aliquid delectus sunt voluptatibus mollitia enim ut aliquam, tempore veritatis dolor commodi architecto repudiandae sit eius distinctio ipsam cupiditate!
                    Sunt quibusdam expedita harum corrupti, obcaecati voluptatibus quo illum. Cumque voluptatum repudiandae molestiae vero minus quidem eius dignissimos facere voluptatibus obcaecati nihil esse, voluptate error sed quas. Distinctio, odio eum.
                    Quo earum eligendi blanditiis repellat nam dignissimos magnam rem sed, hic culpa maxime eius alias illum repellendus. Delectus in, laudantium vel sit laborum eaque doloremque est quod. Esse, consequatur nostrum.
                    Totam possimus eligendi ex consequuntur nostrum atque amet molestias, deserunt quos vel adipisci porro, corrupti, nihil provident. Accusantium ipsa sapiente debitis ab adipisci, doloremque eaque est architecto, exercitationem voluptatibus maiores.
                    Itaque veniam nisi eligendi veritatis rem doloribus rerum inventore magni numquam, ducimus reiciendis aut similique voluptas expedita fugit sequi nihil totam eaque est placeat labore dolores. Expedita modi unde nesciunt.
                    Iure, quis, neque, debitis officia nostrum repellat tempore ipsam consectetur eveniet provident sint eum sapiente vero eius quisquam aspernatur quasi ullam cumque impedit aut natus perspiciatis. Esse id alias maiores.
                    Incidunt ipsa dolore nobis iste fugiat, libero eius necessitatibus beatae porro culpa! Natus a dolor perspiciatis itaque corrupti magnam, aut, laborum officia praesentium officiis quaerat! Dignissimos nihil unde recusandae soluta.
                    Quis, ea velit officia, amet ex blanditiis esse, quaerat illo iusto molestiae dolores dignissimos? Vero voluptatum quaerat fugit ratione asperiores temporibus, voluptatem, ab dolorem est tempore incidunt aperiam. Asperiores, ut?
                    Amet, veritatis qui temporibus dignissimos aut earum fugiat, ducimus repellendus eum tempore quis odio voluptas ipsam. Quidem totam deserunt eos tenetur doloribus fugiat, assumenda eum vero nisi perspiciatis, aliquid in!
                    Assumenda, ipsam. Dolorum maiores impedit delectus quisquam provident excepturi, debitis, optio repellendus iusto explicabo qui nisi aliquid assumenda, perferendis deleniti soluta at odio laudantium nam aliquam ab illo. Nostrum, id!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et eligendi nulla aliquid delectus sunt voluptatibus mollitia enim ut aliquam, tempore veritatis dolor commodi architecto repudiandae sit eius distinctio ipsam cupiditate!
                    Sunt quibusdam expedita harum corrupti, obcaecati voluptatibus quo illum. Cumque voluptatum repudiandae molestiae vero minus quidem eius dignissimos facere voluptatibus obcaecati nihil esse, voluptate error sed quas. Distinctio, odio eum.
                    Quo earum eligendi blanditiis repellat nam dignissimos magnam rem sed, hic culpa maxime eius alias illum repellendus. Delectus in, laudantium vel sit laborum eaque doloremque est quod. Esse, consequatur nostrum.
                    Totam possimus eligendi ex consequuntur nostrum atque amet molestias, deserunt quos vel adipisci porro, corrupti, nihil provident. Accusantium ipsa sapiente debitis ab adipisci, doloremque eaque est architecto, exercitationem voluptatibus maiores.
                    Itaque veniam nisi eligendi veritatis rem doloribus rerum inventore magni numquam, ducimus reiciendis aut similique voluptas expedita fugit sequi nihil totam eaque est placeat labore dolores. Expedita modi unde nesciunt.
                    Iure, quis, neque, debitis officia nostrum repellat tempore ipsam consectetur eveniet provident sint eum sapiente vero eius quisquam aspernatur quasi ullam cumque impedit aut natus perspiciatis. Esse id alias maiores.
                    Incidunt ipsa dolore nobis iste fugiat, libero eius necessitatibus beatae porro culpa! Natus a dolor perspiciatis itaque corrupti magnam, aut, laborum officia praesentium officiis quaerat! Dignissimos nihil unde recusandae soluta.
                    Quis, ea velit officia, amet ex blanditiis esse, quaerat illo iusto molestiae dolores dignissimos? Vero voluptatum quaerat fugit ratione asperiores temporibus, voluptatem, ab dolorem est tempore incidunt aperiam. Asperiores, ut?
                    Amet, veritatis qui temporibus dignissimos aut earum fugiat, ducimus repellendus eum tempore quis odio voluptas ipsam. Quidem totam deserunt eos tenetur doloribus fugiat, assumenda eum vero nisi perspiciatis, aliquid in!
                    Assumenda, ipsam. Dolorum maiores impedit delectus quisquam provident excepturi, debitis, optio repellendus iusto explicabo qui nisi aliquid assumenda, perferendis deleniti soluta at odio laudantium nam aliquam ab illo. Nostrum, id!
                </div>*/}


            </section>
            <section className='s2'>

            </section>
            <section className='s3'>

            </section>
        </div>



    );
}

export default Home;
