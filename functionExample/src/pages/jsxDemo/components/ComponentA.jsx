import { defineComponent } from 'vue';

const ComponentA = defineComponent({
    props: {
        title: String
    },
    setup(props, { slots, emit }) {
        const fn1 = () => {
            emit('change', '子组件数据');
        };

        return () => (
            <div>
                子组件：
                <br />
                {props.title} <br />
                {slots.default()} <br />
                <button onClick={fn1}>按钮</button>
            </div>
        );
    }
});

export default ComponentA;
